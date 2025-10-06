//Show dummy snippets
import React from "react";
import { snippets } from "../data/snippets";
import PostCard from "../components/PostCard";

const Feed = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Tune-in Feed</h1>
            {snippets.map((s) => (
                <PostCard key={s.id} snippet={s} />
            ))}
        </div>
    );
};

export default Feed;