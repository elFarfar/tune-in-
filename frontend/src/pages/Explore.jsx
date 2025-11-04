import { useState } from "react";
import axios from "axios";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:5000/api/posts/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for artists, titles..."
          className="flex-1 p-2 rounded text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-blue-500 px-4 rounded hover:bg-blue-600">Search</button>
      </form>

      <ul className="flex flex-col gap-3">
        {results.map((post) => (
          <li key={post._id} className="bg-gray-800 p-3 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-400">{post.artist}</p>
            <audio controls className="mt-2 w-full">
              <source src={post.audioUrl} type="audio/mpeg" />
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
