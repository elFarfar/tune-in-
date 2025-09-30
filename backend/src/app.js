import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Simple Route
app.get("/", (req, res) => {
  res.send("Tune-In API is running ✅");
});

//Mongo-db connec

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//PORT
const port = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server us rynning on port ${PORT}"));
