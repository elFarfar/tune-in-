import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CreatePost() {
  const { user, token } = useAuth(); 
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
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

      const uploadRes = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

     const audioUrl = uploadRes.data.url;

      if (!audioUrl) {
        throw new Error("Upload failed: no URL returned.");
      }

      //  Create post with required fields
      await axios.post(
        "http://localhost:5000/api/posts",
        {
          title,
          artist: user?.username,
          audioUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reset form and show success
      setTitle("");
      setFile(null);
      setMessage("Post created successfully!");

      // Trigger feed update
      window.dispatchEvent(new Event("postCreated"));
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage(
        error.response?.data?.message || error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-[#222] rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="border p-2 rounded bg-[#333]"
        />

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
