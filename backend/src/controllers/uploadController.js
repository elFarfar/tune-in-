import multer from "multer";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import Snippet from "../models/snippet.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();



// Configure S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Use memory storage (buffer)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload function
export const uploadToS3 = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileKey = `snippets/${uuidv4()}-${file.originalname}`;

    // Upload to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();

    // Save to MongoDB
    const newSnippet = await Snippet.create({
      title: req.body.title || file.originalname,
      artist: req.body.artist || "Unknown Artist",
      audioUrl: data.Location,
    });

    res.status(200).json({
      message: "Upload successful",
      snippet: newSnippet,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};
