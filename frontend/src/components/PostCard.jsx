import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const PostCard = ({ snippet }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    //waveForm
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#d1d5db",
      progressColor: "#4f46e5",
      height: 60,
      cursorColor: "#4f46e5",
      barWidth: 2,
      responsive: true,
    });
    wavesurfer.current.load(snippet.url);

    //Cleanup while mounting
    return () => wavesurfer.current.destroy();
  }, [snippet.url]);

  const togglePLay = () => {
    wavesurfer.current.playPause();
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="font-semibold text-lg">{snippet.title}</h2>
      <p className="text-sm text-gray-600">By {snippet.user}</p>

      <div className="mt-2 min-h-[80px]" ref={waveformRef}></div>

      <button
        onClick={togglePLay}
        className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
      >
        {isPlaying ? "pause" : "play"}
      </button>

      <p className="mt-2">❤️ {snippet.likes} likes</p>

      <div className="mt-2">
        {snippet.comments.map((c, i) => (
          <p key={i}>
            <strong> {c.user}: </strong>
            {c.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
