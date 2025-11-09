import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    audioUrl: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    comments: [
      {
        user: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema);
export default post;
