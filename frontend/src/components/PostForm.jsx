// frontend/src/components/PostForm.jsx
import { useState } from "react";
import { createPost } from "../services/postService";
import { useAuth } from "../context/AuthContext";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please choose a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", file);

    try {
      const res = await createPost(formData, token);
      setMessage("✅ Upload successful!");
      console.log("Post created:", res);
    } catch (error) {
      setMessage(error.message || "Upload failed!");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Create a Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded bg-gray-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          className="p-2 rounded bg-gray-800 text-white"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Upload
        </button>
      </form>
      {message && <p className="text-center mt-3 text-gray-300">{message}</p>}
    </div>
  );
}
