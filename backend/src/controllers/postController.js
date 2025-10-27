import Post from "../models/Post.js";

//GET ALL POST
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findOne().populate("createdBy", "username role");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

//CREATE NEW POST
export const createPost = async (req, res) => {
  try {
    const { artist, title, audioUrl } = req.body;

    if (!title || !audioUrl)
      return res.status(400).json({ message: "Missing required fields! " });

    const newPost = await Post.create({
      title,
      artist,
      audioUrl,
      createdBy: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post!" });
  }
};
//UPDATE OWN POST
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(401).json({ message: "Post not found! " });

    //Check if the post and owner are the same
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatePost = await post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

//DELETE POST

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found!" });

    //ONLY USER OR ADMIN
    if (
      post.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post!" });
  }
};
