import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",       
  "https://tune-in-now.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Tune-In API is running");
});

// Vanliga routes
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ADMIN ROUTES — under /api/admin
app.use("/api/admin", adminRoutes);

export default app;
