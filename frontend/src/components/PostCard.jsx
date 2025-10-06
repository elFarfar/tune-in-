import React from "react";

const PostCard = ({ snippet }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="font-semibold">{snippet.title}</h2>
        <p className="text-sm text-gray-600">By {snippet.user}</p>

        <audio controls className="w-full mt-2">
          <source src={snippet.url} type="audio/mp3" />
          Youre Browser does not support the audio element.
        </audio>

        <p className="mt-2">❤️ {snippet.likes} likes</p>

        <div className="mt-2">
            {snippet.comments.map((c, i) => (
                <p key={i}>
                    <strong>{c.user}: </strong>
                    {c.text}
                </p>
            ))}
        </div>
      </div>
    );
};

export default PostCard;