import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//test-route
app.get("/", (req, res)=> {
  res.send("Tune-In API is running");
});

//Routes
app.use("/upload", uploadRoutes);

//MongoDB-connection
mongoose 
 .connect(process.env.MONGO_URI)
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.error("MongoDB connection error:", err));

 //ServerStart
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

