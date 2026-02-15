import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyEvents() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/registrations/me");
      setRegistrations(res.data.data);
    } catch (err) {
      console.log("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (eventId) => {
    const confirm = window.confirm(
      "Cancel this registration?"
    );
    if (!confirm) return;

    await API.delete(`/registrations/${eventId}`);
    fetchMyEvents();
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading your events...
      </div>
    );
  }

  const now = new Date();

  const upcoming = registrations.filter(
    (r) => new Date(r.event.dateTime) > now
  );

  const past = registrations.filter(
    (r) => new Date(r.event.dateTime) <= now
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            My Events
          </h1>
          <p className="text-sm text-slate-500">
            Manage your registered events
          </p>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Upcoming Events
          </h2>

          {upcoming.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No upcoming events.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcoming.map((reg) => (
                <div
                  key={reg._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {reg.event.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {reg.event.location}
                  </p>

                  <p className="text-sm text-slate-600 mt-2">
                    {new Date(
                      reg.event.dateTime
                    ).toLocaleString()}
                  </p>

                  <button
                    onClick={() =>
                      handleCancel(reg.event._id)
                    }
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Cancel Registration
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Past Events
          </h2>

          {past.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No past events.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {past.map((reg) => (
                <div
                  key={reg._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm opacity-80"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {reg.event.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {reg.event.location}
                  </p>

                  <p className="text-sm text-slate-600 mt-2">
                    {new Date(
                      reg.event.dateTime
                    ).toLocaleString()}
                  </p>

                  <p className="mt-4 text-xs text-slate-400">
                    Event Completed
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
