import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: { string, required: true },
    artist: { string },
    url: { string, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Snippet = mongoose.model("snippet", snippetSchema);

export default Snippet;
