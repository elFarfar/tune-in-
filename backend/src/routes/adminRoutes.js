import {
  addNewUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/adminController.js";
import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

//ONLY ADMIN CAN ACCESS
router.use(protect, adminOnly, addNewUser);

router.get("/users", getAllUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
