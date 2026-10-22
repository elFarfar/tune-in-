import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Feed() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // GET ALL POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data.reverse());
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
    <div className="w-full max-w-2xl mx-auto mt-10 ">
      <div className="flex items-center justify-center mb-10">
        <h1 className="font-bold text-center mb-10 text-4xl text-white-800 tracking-wide ">
          Share your sound. Get feedback. Grow together.
        </h1>
        {/* ARROW IN THE FUTURE */}
        {/*img src={ArrowDown} alt="arrow-down" className="h-12 mt-10"/*/}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Latest Posts</h1>

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
              onClick={() => navigate(`/posts/${post._id}`)}
              className="grid grid-cols-3 gap-4 p-6 rounded-t-sm outline-white shadow-md hover:bg-gray-800/70 transition cursor-pointer"
            >
              {/* Top left: Title */}
              <h2 className="text-xl font-semibold">{post.title}</h2>

              {/* Top right: User */}
              <a
                href={`/profile/${post.createdBy?._id}`}
                className="text-sm text-blue-400 text-right hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {post.artist || post.createdBy?.username || "Unknown"}
              </a>

              {/* Middle middle: Description */}
              <h2 className="text-sm  text-white-400 col-span-3 text-left">
                {post.description}
              </h2>

              {/* Middle left: Audio */}
              <audio
                controls
                src={post.audioUrl}
                className="w-full col-span-2 static "
                onClick={(e) => e.stopPropagation()}
              />

              {/* Bottom right: Date */}
              <span className="text-xs text-gray-500  ">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
                {(post.comments?.length || 0) > 0
                  ? ` · ${post.comments.length} comment${
                      post.comments.length === 1 ? "" : "s"
                    }`
                  : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
