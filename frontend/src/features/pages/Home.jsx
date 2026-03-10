import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import FaceExpression from "./FaceExpression";
import Player from "../songs/pages/Player";
import useSong from "../songs/hooks/usesong";

export const Home = () => {
  const { loading, Log_out } = useAuth();
  const{handleGetSong}=useSong();
  const navigate = useNavigate();

  async function handleLogout() {
    await Log_out();
    navigate("/");
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-blue-600 py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Welcome to Moodify</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-between flex-grow space-y-4 lg:space-y-0 lg:space-x-8 p-6">
        {/* Face Expression Section */}
        <section className="w-full lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <FaceExpression
           onClick={(mood)=>{
            handleGetSong({mood});
           }}
          
          />
        </section>

        {/* Music Player Section */}
        <section className="w-full lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <Player />
        </section>
      </main>

      {/* Footer with Logout Button */}
      <footer className="w-full bg-gray-800 py-4 text-center">
        <button
          className="px-6 py-2 text-lg bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </footer>
    </div>
  );
};
