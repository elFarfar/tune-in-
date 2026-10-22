import {
  addNewUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllPosts,
  deletePost,
} from "../controllers/adminController.js";
import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// PROTECT ALL ADMIN ROUTES
router.use(protect, adminOnly);

// Routes
router.get("/users", getAllUsers);
router.post("/users", addNewUser);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

router.get("/posts", getAllPosts);
router.delete("/posts/:id", deletePost);

export default router;
