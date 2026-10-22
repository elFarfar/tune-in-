import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [posts, SetPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API}/posts`);
        SetPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API]);

  if (!user) return <p className="p-6">You're bit logged in.</p>;

  const userId = String(user.id || user._id || "");
  const userPosts = posts
    .filter((post) => {
      const authorId = post.createdBy?._id || post.createdBy;
      return authorId && String(authorId) === userId;
    })
    .reverse(); //New first

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile header */}
      <div className="flex items-center gap-6 mb-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
          {user.username[0].toUpperCase()}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">@{user.username}</h1>
          <p className="text-gray-400">{user.role}</p>

          <div className="flex gap-3 mt-3">
            <Link
            to="/create" 
            className="bg-blue-600 px-4 py-1 rounded text-sm">
              Upload
            </Link>
            <button
            //Change this to settings 
              onClick={logout}
              className="bg-red-500 px-4 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Posts section */}
      <h2 className="text-xl font-semibold mb-4">
        Your posts ({userPosts.length})
      </h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : userPosts.length === 0 ? (
        <p className="text-gray-400">You haven’t uploaded anything yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userPosts.map((post) => (
            <li
              key={post._id}
              className="p-4 rounded shadow hover:bg-gray-800/70 transition"
            >
              <h3 className="font-semibold mb-2">{post.title}</h3>

              {post.audioUrl && (
                <audio controls src={post.audioUrl} className="w-full mb-2" />
              )}

              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
