import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import Snippet from "../models/snippet.js";
import { v4 as uuidv4 } from "uuid";
import { parseBuffer } from "music-metadata";

dotenv.config();

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_DURATION = 30;

const ALLOWED_MIME_TYPES = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/x-m4a",
  "audio/ogg",
  "audio/flac",
  "audio/aac",
]);

const s3 = new S3Client({
  region: process.env.CLOUDFLARE_REGION || "auto",
  endpoint: process.env.CLOUDFLARE_S3_API,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

export const uploadToS3 = async (req, res) => {
  let fileKey;
  let uploadedToR2 = false;

  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    if (file.size > MAX_FILE_SIZE) {
      return res.status(413).json({
        error: "Audio files must be 15 MiB or smaller.",
      });
    }

    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return res.status(400).json({
        error: "Unsupported audio format.",
      });
    }

    const metadata = await parseBuffer(
      file.buffer,
      { mimeType: file.mimetype },
      { duration: true },
    );

    const duration = metadata.format.duration;

    if (
      typeof duration !== "number" ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      return res.status(400).json({
        error: "Could not determine a valid audio duration.",
      });
    }

    if (duration > MAX_DURATION) {
      return res.status(400).json({
        error: "Audio snippets must be 30 seconds or shorter.",
        duration,
        maxDuration: MAX_DURATION,
      });
    }

    const safeFilename = file.originalname
      .split(/[\\/]/)
      .pop()
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    fileKey = `snippets/${uuidv4()}-${safeFilename}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    uploadedToR2 = true;

    const publicBaseUrl = process.env.CLOUDFLARE_PUBLIC_URL.replace(/\/$/, "");

    const audioUrl = `${publicBaseUrl}/${fileKey
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`;

    const newSnippet = await Snippet.create({
      title: req.body.title || safeFilename,
      artist: req.body.artist || "Unknown Artist",
      audioUrl,
      duration,
      fileSize: file.size,
      uploadedBy: req.user?.id || req.user?._id || "Anonymous",
    });

    return res.status(201).json({
      message: "Upload successful",
      url: audioUrl,
      snippet: newSnippet,
    });
  } catch (error) {
    console.error("Upload error:", error);

    if (uploadedToR2 && fileKey) {
      try {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: fileKey,
          }),
        );
      } catch (cleanupError) {
        console.error("R2 cleanup error:", cleanupError);
      }
    }

    return res.status(500).json({
      error: "Upload failed",
    });
  }
};
