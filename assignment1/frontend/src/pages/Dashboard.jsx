import { useEffect, useState } from "react";
import API from "../services/api";
import { Card, CardHeader, CardContent } from "../components/ui/Card";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data.data);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-6">

      <Card>
        <CardHeader>Total Expenses</CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            ₹ {data?.totalExpense || 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Category Breakdown</CardHeader>
        <CardContent>
          {data?.categoryBreakdown?.length > 0 ? (
            data.categoryBreakdown.map((cat) => (
              <div
                key={cat._id}
                className="flex justify-between py-1"
              >
                <span>{cat._id}</span>
                <span>₹ {cat.total}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm">
              No data available
            </p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
