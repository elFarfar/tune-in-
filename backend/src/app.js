import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tune-In API is running");
});
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

//ADMIN
app.use;
"/admin", adminRoutes;

export default app;
