import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import cors from "cors";
dotenv.config();



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
