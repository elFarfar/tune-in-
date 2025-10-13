import React from "react";
import { snippets } from "../data/snippets";
import PostCard from "../components/PostCard";

const Feed = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Tune-in Feed</h1>
      <div className="w-full max-w-2xl space-y-6">
        {snippets.map((s) => (
          <PostCard key={s.id} snippet={s} />
        ))}
      </div>
    </>
  );
};

export default Feed;
