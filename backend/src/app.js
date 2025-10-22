import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tune-In API is running");
});
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

export default app;
