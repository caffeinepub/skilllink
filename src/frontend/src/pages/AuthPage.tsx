import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_ME, useApp } from "../context/AppContext";

export function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const { setLoggedInUser } = useApp();
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (tab === "signup" && !name) {
      setError("Please enter your name.");
      return;
    }

    const user = {
      ...DEFAULT_ME,
      name: tab === "signup" ? name : "Alex Johnson",
      location: location || DEFAULT_ME.location,
    };
    setLoggedInUser(user);
    const from =
      (routerLocation.state as { from?: string })?.from || "/dashboard";
    navigate(from);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F7FB] py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
            style={{ background: "linear-gradient(135deg, #0B63D9, #1E8BFF)" }}
          >
            S
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome to SkillLink
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Free local skill sharing platform
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            data-ocid="auth.login.tab"
            onClick={() => setTab("login")}
            className={`flex-1 text-sm font-semibold py-2 rounded-md transition-colors ${
              tab === "login"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            data-ocid="auth.signup.tab"
            onClick={() => setTab("signup")}
            className={`flex-1 text-sm font-semibold py-2 rounded-md transition-colors ${
              tab === "signup"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === "signup" && (
            <input
              data-ocid="auth.name.input"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            data-ocid="auth.email.input"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            data-ocid="auth.password.input"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {tab === "signup" && (
            <input
              data-ocid="auth.location.input"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400"
              placeholder="Your City / Area (e.g. Brooklyn, NY)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          )}
          {error && (
            <p data-ocid="auth.error_state" className="text-red-500 text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            data-ocid="auth.submit_button"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {tab === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            No credit card required. Always free.
          </p>
        </div>
      </div>
    </div>
  );
}
