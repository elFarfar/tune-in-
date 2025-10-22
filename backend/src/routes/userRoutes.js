import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//middleware
router.get("/Profile", protect, (req, res) => {
  res.json({ message: "Access granted", user: req.user, });
});

export default router;
