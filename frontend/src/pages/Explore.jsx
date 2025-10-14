import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { snippets } from "../data/snippets"; // 👈 import your dummy snippets
import PostCard from "../components/PostCard"; // reuse the PostCard component

function Explore() {
  const [query, setQuery] = useState("");
  
  // Filter snippets by title or user
  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      snippet.user.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen  p-6">
      <h1 className="text-2xl font-bold text-white-900 mb-6">SEARCH POSTS</h1>

      <div className="w-full max-w-md mb-8">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          //Styleoveride for color change
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, 
              "&:hover fieldset": { borderColor: "#60a5fa" }, 
              "&.Mui-focused fieldset": { borderColor: "white" }, 
            },
            "& .MuiInputLabel-root": {
              color: "white", 
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
      </div>

      <div className="w-full max-w-2xl">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => (
            <PostCard key={snippet.id} snippet={snippet} />
          ))
        ) : (
          <p className="text-white-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Explore;
