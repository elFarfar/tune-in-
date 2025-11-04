import express from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { searchPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/search", searchPosts);
router.get("/", getPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
