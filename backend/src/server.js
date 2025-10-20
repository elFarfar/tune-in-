import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();
connectDB();


const server = express();
server.use(cors());
server.use(express.json());
server.use("/api", app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(` Server running on Port ${PORT}`));