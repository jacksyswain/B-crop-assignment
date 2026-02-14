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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

        <h1 className="text-2xl font-semibold text-slate-900 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Sign in to manage your events
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

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
  );
}
