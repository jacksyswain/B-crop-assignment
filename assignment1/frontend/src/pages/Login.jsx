import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Card, CardHeader, CardContent } from "../components/ui/Card";

export default function Login() {
  const { login } = useAuth();

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
    <div className="w-full max-w-md">

      <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <CardHeader className="text-center space-y-2 pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to access your dashboard
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="bg-slate-50 border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="bg-slate-50 border-slate-200"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

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
        </CardContent>

      </Card>

    </div>
  </div>
);

}
