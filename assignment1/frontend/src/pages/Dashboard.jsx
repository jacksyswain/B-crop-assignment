import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { Card, CardHeader, CardContent } from "../components/ui/Card";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/dashboard");
      setData(res.data.data);
    } catch (err) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();

    const handleFocus = () => {
      fetchDashboard();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Loading */}
      {loading && (
        <div className="text-center text-slate-400 py-16">
          Loading dashboard...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 py-10">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Overview of your financial activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Total Expenses */}
            <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <h2 className="text-sm font-medium text-slate-500">
                  Total Expenses
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold text-slate-900">
                  ₹ {data?.totalExpense || 0}
                </p>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <h2 className="text-sm font-medium text-slate-500">
                  Category Breakdown
                </h2>
              </CardHeader>
              <CardContent>
                {data?.categoryBreakdown?.length > 0 ? (
                  <div className="space-y-3">
                    {data.categoryBreakdown.map((cat) => (
                      <div
                        key={cat._id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-slate-700">
                          {cat._id}
                        </span>
                        <span className="font-medium text-slate-900">
                          ₹ {cat.total}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">
                    No data available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <h2 className="text-sm font-medium text-slate-500">
                  Recent Transactions
                </h2>
              </CardHeader>
              <CardContent>
                {data?.recent?.length > 0 ? (
                  <div className="space-y-3">
                    {data.recent.map((t) => (
                      <div
                        key={t._id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-slate-700">
                          {t.title}
                        </span>
                        <span className="font-medium text-slate-900">
                          ₹ {t.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">
                    No recent transactions
                  </p>
                )}
              </CardContent>
            </Card>

          </div>
        </>
      )}
    </div>
  </div>
);

}
