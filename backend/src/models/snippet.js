import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled",
    },
    artist: {
      type: String,
      default: "Unknown",
    },
    audioUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
      default: "Anonymous",
    },
    duration: {
      type: Number,
      required: true,
      max: 30,
    },
    fileSize: {
      type: Number,
      required: true,
      max: 15 * 1024 * 1024,
    },
  },
  { timestamps: true },
);

const Snippet = mongoose.model("Snippet", snippetSchema);

export default Snippet;
