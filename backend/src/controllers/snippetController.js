import Snippet from "../models/snippet";
import { uploadToS3 } from "../utils/uploadToS3";

export const upploadSnippet = async (req, res) => {
  try {
    if (!reqfile)
      return res.status(400).json({ message: "No file, uploaded " });

    const url = await uploadToS3(reqfile);
    const snippet = await Snippet.create({
      title: req.body.title || req.file.originalname,
      artist: req.body.artist || "unknown",
      url,
    });

    res.status(201).json(snippet);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed:", error});
  }
};



