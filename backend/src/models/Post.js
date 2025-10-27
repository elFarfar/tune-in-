import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  audioUrl: { type: String, required: true},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
},
{ timestamps: true }
);

const post = mongoose.model("Post", postSchema);
export default post;
