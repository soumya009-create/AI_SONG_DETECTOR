import React, { useRef, useState, useContext, useEffect } from "react";
import { Songcontext } from "../SongContext";
import useSong from "../hooks/usesong";

const Player = () => {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false);

  // Access song data from SongContext
  const { song } = useSong();

  // Play the audio
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the audio
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Skip forward by 10 seconds
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  // Skip backward by 10 seconds
  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  // 🔴 Load and play new song when song changes
  useEffect(() => {
    if (audioRef.current && song.url) {
      audioRef.current.src = song.url;
      audioRef.current.load(); // 🔴 Reload the audio element
      audioRef.current.play(); // 🔴 Auto-play the new song
      setIsPlaying(true);
    }
  }, [song]); // Run this effect when song changes

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto">
      {/* Song Poster */}
      <div className="mb-4">
        <img
          src={song.posterurl || "https://via.placeholder.com/300"} // Fallback for poster URL
          alt={song.title || "No Title"}
          className="w-full rounded-lg"
        />
      </div>

      {/* Song Title */}
      <h2 className="text-xl font-bold text-gray-800 mt-2">
        {song.title || "No Title"}
      </h2>

      {/* Audio Player */}
      <div className="w-full">
        <audio ref={audioRef} className="w-full">
          <source src={song.url || ""} type="audio/mpeg" /> {/* Fallback for song URL */}
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center w-full mt-4">
        <button
          onClick={handleBackward}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ⏪ 10s
        </button>
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            ▶ Play
          </button>
        )}
        <button
          onClick={handleForward}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          10s ⏩
        </button>
      </div>
    </div>
  );
};

export default Player;