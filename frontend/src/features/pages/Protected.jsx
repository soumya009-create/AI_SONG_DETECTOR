import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-shell">
        <div className="page-frame flex min-h-[70vh] items-center justify-center">
          <div className="glass-panel px-8 py-7 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Moodify
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Preparing your workspace
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              We are checking the current session before opening the dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && !user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
