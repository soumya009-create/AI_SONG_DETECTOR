import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import FaceExpression from "./FaceExpression";
import Player from "../songs/pages/Player";
import useSong from "../songs/hooks/usesong";

const workspaceNotes = [
  {
    title: "Mood capture",
    description: "Use the live camera frame to detect a facial expression in one click.",
  },
  {
    title: "Smart matching",
    description: "The detected mood is sent directly into the song recommendation flow.",
  },
  {
    title: "Instant playback",
    description: "A matched track loads into the player automatically when available.",
  },
];

export const Home = () => {
  const { loading, Log_out, user } = useAuth();
  const { handleGetSong } = useSong();
  const navigate = useNavigate();

  async function handleLogout() {
    await Log_out();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="glass-panel overflow-hidden px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="pill w-max">Live mood-to-music workspace</div>
              <p className="mt-5 text-sm uppercase tracking-[0.28em] text-cyan-100/65">
                Moodify dashboard
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {user?.username ? `Welcome back, ${user.username}.` : "Welcome back."}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                Detect the user's current expression and route the result straight
                into music playback, now inside a more polished and professional
                interface.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:min-w-[240px] xl:flex-col">
              <div className="surface-subtle px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Workspace status
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Camera, detection, and playback aligned
                </p>
              </div>

              <button
                className="secondary-button"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workspaceNotes.map((note) => (
              <div key={note.title} className="surface-subtle p-5">
                <p className="text-sm font-semibold text-white">{note.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </header>

        <main className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="glass-panel p-5 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Detector
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Read the current mood
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Capture a single frame from the live feed and forward the mood
                  result into the music engine.
                </p>
              </div>

              <div className="surface-subtle px-4 py-3 text-sm text-slate-300">
                Single-capture recommendation flow
              </div>
            </div>

            <FaceExpression
              onClick={(mood) => {
                handleGetSong({ mood });
              }}
            />
          </section>

          <section className="glass-panel p-5 sm:p-6">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Player
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Listen to the matched track
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The player updates as soon as a song is returned for the detected
                mood.
              </p>
            </div>

            <Player />
          </section>
        </main>
      </div>
    </div>
  );
};
