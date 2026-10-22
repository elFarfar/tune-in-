import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    audioUrl: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.Mixed },
        username: String,
        text: { type: String, required: true, trim: true, maxlength: 1000 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema);
export default post;
