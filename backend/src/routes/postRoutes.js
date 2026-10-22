import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  searchPosts,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/search", searchPosts);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.post("/:id/comments", protect, addComment);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.put("/:id/like", protect, toggleLike); 


export default router;
