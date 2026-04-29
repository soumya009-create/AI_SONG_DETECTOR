import React, { useEffect, useRef, useState } from "react";
import useSong from "../hooks/usesong";

const Player = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { song, loading } = useSong();
  const hasSong = Boolean(song?.url);

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      }
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  useEffect(() => {
    if (audioRef.current && song?.url) {
      audioRef.current.src = song.url;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Auto-play failed:", error);
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
    }
  }, [song]);

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(155deg,rgba(8,47,73,0.92),rgba(15,23,42,0.96)),radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_35%)]">
        {song?.posterurl ? (
          <img
            src={song.posterurl}
            alt={song.title || "Selected song artwork"}
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] items-end p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">
                Artwork
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {loading ? "Matching a track..." : "Waiting for a mood match"}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200/75">
                Capture a mood from the detector and the player will populate with
                the next recommendation.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="surface-subtle p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Now playing
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {song?.title || "Waiting for a match"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {loading
                ? "Curating a song for the latest detected mood."
                : hasSong
                  ? "A matching track is loaded. Use the controls below to play, pause, or skip."
                  : "Detect a mood to load a matching track into the player."}
            </p>
          </div>

          <div className="inline-flex w-max items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100">
            {loading ? "Loading" : hasSong ? "Track ready" : "Standby"}
          </div>
        </div>

        <audio ref={audioRef} className="hidden">
          <source src={song?.url || ""} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button
            onClick={handleBackward}
            className="secondary-button w-full"
            disabled={!hasSong}
          >
            Back 10s
          </button>

          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="primary-button w-full"
            disabled={!hasSong}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={handleForward}
            className="secondary-button w-full"
            disabled={!hasSong}
          >
            Forward 10s
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
