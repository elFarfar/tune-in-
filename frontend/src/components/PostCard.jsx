import React, { useEffect, useRef, useState, useContext } from "react";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PostCard = ({ snippet }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(snippet.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    // Create waveform
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#d1d5db",
      progressColor: "#4f46e5",
      height: 60,
      cursorColor: "#4f46e5",
      barWidth: 2,
      responsive: true,
    });

    wavesurfer.current.load(snippet.audioUrl);

    // Cleanup
    return () => wavesurfer.current.destroy();
  }, [snippet.audioUrl]);

  const togglePlay = () => {
    wavesurfer.current.playPause();
    setIsPlaying(!isPlaying);
  };

  // ✅ Like toggle
  const handleLike = async () => {
    if (!token) return alert("You must be logged in to like posts");

    try {
      const res = await axios.put(
        `${API}/posts/${snippet._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLiked(!isLiked);
      setLikes(res.data.likesCount);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
      <h2 className="font-semibold text-gray-900">{snippet.title}</h2>
      <p className="text-sm text-gray-600">
        By {snippet.artist || snippet.createdBy?.username}
      </p>

      <div className="mt-2 min-h-[80px]" ref={waveformRef}></div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={togglePlay}
          className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition ${
            isLiked ? "text-red-600" : "text-gray-600"
          } hover:text-red-500`}
        >
          <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
          <span>{likes}</span>
        </button>
      </div>

      {snippet.comments?.length > 0 && (
        <div className="mt-3 border-t border-gray-200 pt-2">
          {snippet.comments.map((c, i) => (
            <p key={i} className="text-gray-700 text-sm">
              <strong>{c.user}: </strong>
              {c.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
