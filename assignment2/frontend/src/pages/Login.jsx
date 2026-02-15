import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.data.token);
      navigate("/events");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Branding Section */}
      <div className="hidden md:flex w-1/2 bg-slate-900 text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold">
          Event Platform
        </h1>
        <p className="mt-4 text-slate-300 text-center max-w-md">
          Discover, manage and register for events effortlessly.
          A modern platform built for seamless event experiences.
        </p>
      </div>

      {/* Right Login Section */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 text-center mt-1">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                className="w-full mt-1 border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-slate-300 outline-none"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-600">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-slate-300 outline-none"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-2 text-xs text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2 transition-all duration-200"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register */}
            <p className="text-sm text-center text-slate-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-slate-900 font-medium hover:underline"
              >
                Create one
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
