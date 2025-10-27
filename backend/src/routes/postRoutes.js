import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", Protect, createPost);
router.put("/:id", Protect, updatePost);
router.delete("/:id", Protect, deletePost);

export default router;
