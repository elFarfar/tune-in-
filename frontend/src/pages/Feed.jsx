import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET ALL POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data.reverse()); // latest first
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // REAL TIME UPDATE OF POST
  useEffect(() => {
    const handleNewPost = () => fetchPosts();
    window.addEventListener("postCreated", handleNewPost);
    return () => window.removeEventListener("postCreated", handleNewPost);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎵 Latest Posts</h1>

        {user && (
          <Link
            to="/create"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            + Create Post
          </Link>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400 text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400 text-center">No posts yet</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-[#222] p-4 rounded-lg shadow-md hover:bg-[#2a2a2a] transition"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-400 text-sm">
                by {post.artist || post.createdBy?.username || "Unknown"} •{" "}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </p>
              <audio controls src={post.audioUrl} className="mt-3 w-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
