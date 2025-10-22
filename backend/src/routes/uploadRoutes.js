import express from "express";
import { uploadToS3, upload } from "../controllers/uploadController.js";

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("file"), uploadToS3);

export default router;
