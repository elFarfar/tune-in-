import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function commentAuthor(comment) {
  if (comment.username) return comment.username;
  if (typeof comment.user === "string") return comment.user;
  return comment.user?.username || "Unknown";
}

export default function PostId() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API}/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setPost(null);
        setError(err.response?.data?.message || "Could not load this post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const userId = user?.id || user?._id;
  const liked = Boolean(
    post?.likes?.some((like) => (like?._id || like) === userId)
  );

  const handleLike = async () => {
    if (!token) {
      setError("Log in to like this post");
      return;
    }

    setLiking(true);
    setError("");
    try {
      const res = await axios.put(
        `${API}/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost((prev) => ({ ...prev, likes: res.data.likes }));
    } catch (err) {
      setError(err.response?.data?.message || "Could not update like");
    } finally {
      setLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!token) {
      setError("Log in to comment");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post(
        `${API}/posts/${id}/comments`,
        { text: comment.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data);
      setComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not post comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-gray-400 text-center mt-10">Loading post...</p>;
  }

  if (!post) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-10 text-center">
        <p className="text-gray-400 mb-4">{error || "Post not found"}</p>
        <Link to="/" className="text-blue-400 hover:underline">
          Back to feed
        </Link>
      </div>
    );
  }

  const comments = [...(post.comments || [])].reverse();

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <Link to="/" className="text-sm text-blue-400 hover:underline">
        ← Back to feed
      </Link>

      <article className="mt-4 p-6 rounded-sm shadow-md outline-white">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <span className="text-sm text-blue-400 shrink-0">
            {post.artist || post.createdBy?.username || "Unknown"}
          </span>
        </div>

        {post.description && (
          <p className="text-sm mt-3 text-left">{post.description}</p>
        )}

        <audio controls src={post.audioUrl} className="w-full mt-4" />

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={handleLike}
            disabled={liking}
            className={`flex items-center gap-2 px-3 py-1 rounded transition ${
              liked ? "text-red-400" : "text-gray-300"
            } hover:text-red-400 disabled:opacity-60`}
          >
            <span>{liked ? "♥" : "♡"}</span>
            <span>
              {post.likes?.length || 0}{" "}
              {(post.likes?.length || 0) === 1 ? "like" : "likes"}
            </span>
          </button>
          <span className="text-xs text-gray-500">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </article>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">
          Comments ({comments.length})
        </h2>

        <form onSubmit={handleComment} className="flex flex-col gap-3 mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment"
            maxLength={1000}
            rows={3}
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={submitting || !comment.trim()}
            className="self-end bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded"
          >
            {submitting ? "Posting..." : "Comment"}
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm">No comments yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {comments.map((item) => (
              <li
                key={item._id}
                className="p-3 rounded bg-gray-800/60 text-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <strong>{commentAuthor(item)}</strong>
                  <span className="text-xs text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>
                <p className="text-gray-200 whitespace-pre-wrap">{item.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
