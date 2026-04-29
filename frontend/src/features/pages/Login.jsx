import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const highlights = [
  {
    title: "Live expression capture",
    description: "Detect the current facial mood directly from the camera feed.",
  },
  {
    title: "Instant soundtrack matching",
    description: "Send the detected mood straight into the music flow with no extra steps.",
  },
  {
    title: "Clean, responsive workspace",
    description: "A more professional visual system without changing the login behavior.",
  },
];

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { loading, Log } = useAuth();
  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      await Log(username, password);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="app-shell">
      <div className="page-frame flex min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/75 shadow-[0_32px_110px_rgba(2,8,23,0.6)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
          <section className="relative hidden flex-col justify-between bg-[linear-gradient(160deg,rgba(6,182,212,0.28),rgba(15,23,42,0.94)),radial-gradient(circle_at_top,rgba(125,211,252,0.28),transparent_42%)] p-10 lg:flex">
            <div className="pill w-max">Emotion-led music platform</div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/70">
                Moodify
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight text-white">
                Turn a facial expression into the right soundtrack.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-100/85">
                The app keeps its current camera, auth, and playback flow, but now
                presents it in a sharper and more polished workspace.
              </p>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-white/10 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                  Sign in
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  Welcome back
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                  Access mood detection and matching playback from one refined
                  workspace.
                </p>
              </div>

              <div className="surface-subtle hidden min-w-[160px] px-4 py-3 sm:block">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Session
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {loading ? "Checking..." : "Ready"}
                </p>
              </div>
            </div>

            <form onSubmit={handlesubmit} className="space-y-5">
              <div>
                <label className="input-label" htmlFor="login-username">
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  className="input-field"
                  autoComplete="username"
                  required
                />
              </div>

              <div>
                <label className="input-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="input-field"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="primary-button w-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-300">
              Need an account?{" "}
              <button
                type="button"
                className="muted-link cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </button>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
