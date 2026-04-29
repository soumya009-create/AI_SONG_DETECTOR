import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const registrationPoints = [
  "Create an account and start detecting moods right away.",
  "Keep the same camera-powered workflow with a more polished UI.",
  "Move smoothly between mood capture and personalized playback.",
];

function Registration() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loading, Registration: registerUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    await registerUser(username, email, password);
    navigate("/home");
  }

  return (
    <div className="app-shell">
      <div className="page-frame flex min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/75 shadow-[0_32px_110px_rgba(2,8,23,0.6)] backdrop-blur-xl lg:grid-cols-[0.96fr_1.04fr]">
          <section className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <div className="pill w-max">Create account</div>
              <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                Join the Moodify workspace
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                Set up your account and keep the same registration flow, now with
                a cleaner, more professional presentation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="input-label" htmlFor="register-username">
                  Username
                </label>
                <input
                  id="register-username"
                  type="text"
                  name="username"
                  placeholder="Choose a username"
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
                <label className="input-label" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  className="input-field"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="input-label" htmlFor="register-password">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="input-field"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="primary-button w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-300">
              Already have an account?{" "}
              <button
                type="button"
                className="muted-link cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </button>
            </p>
          </section>

          <section className="relative hidden border-l border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.9),rgba(8,145,178,0.3)),radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_36%)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/70">
                Account setup
              </p>
              <h3 className="mt-5 text-4xl font-semibold leading-tight text-white">
                Start with a calm, clear onboarding experience.
              </h3>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-100/80">
                The redesigned sign-up screen gives the project a stronger
                product feel while leaving the underlying registration logic
                untouched.
              </p>
            </div>

            <div className="grid gap-4">
              {registrationPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[24px] border border-white/10 bg-white/10 p-5"
                >
                  <p className="text-sm leading-6 text-slate-100/85">{point}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Registration;
