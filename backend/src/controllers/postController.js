import Post from "../models/Post.js";

//  GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    
    const posts = await Post.find().populate("createdBy", "username role");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// CREATE NEW POST
export const createPost = async (req, res) => {
  try {
    const { artist, title, audioUrl } = req.body;

    if (!title || !audioUrl) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const newPost = await Post.create({
      title,
      artist,
      audioUrl,
      createdBy: req.user.id, // authMiddleware
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

// UPDATE OWN POST
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    // Check if user owns post
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    // Only user or admin can delete post
    if (post.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post!" });
  }
};
