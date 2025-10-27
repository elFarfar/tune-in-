import express from "express";
import { uploadToS3, upload } from "../controllers/uploadController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("file"), uploadToS3, protect);

export default router;
