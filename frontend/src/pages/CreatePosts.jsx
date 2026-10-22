import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CreatePost() {
  const { user, token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file || !description) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!token) {
      setMessage("You must be logged in to create a post.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(`${API}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const audioUrl = uploadRes.data.url;

      if (!audioUrl) {
        throw new Error("Upload failed: no URL returned.");
      }

      // Create post
      await axios.post(
        `${API}/posts`,
        {
          title,
          description,
          artist: user?.username,
          audioUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      setFile(null);
      setMessage("Post created successfully!");

      // Trigger feed update
      window.dispatchEvent(new Event("postCreated"));
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto  rounded-xl shadow-lg mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Give your post a name"
          className="border p-3 rounded text-white-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="What's the issue?"
          className="border rounded p-3 h-32 resize-none align-top text-white-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="border p-2 rounded bg-gray-400 cursor-pointer"
        />
        <p className="text-sm text-gray-400 -mt-2">max 15mb & max 30 sek</p>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
      )}
    </div>
  );
}
