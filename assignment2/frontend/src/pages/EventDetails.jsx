import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function EventDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/events/${id}`);
      setEvent(res.data.data);
    } catch (err) {
      setError("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      await API.post(`/registrations/${id}`);
      fetchEvent();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = async () => {
    try {
      setRegistering(true);
      await API.delete(`/registrations/${id}`);
      fetchEvent();
    } catch (err) {
      alert("Cancel failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading event...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!event) return null;

  const isFull = event.availableSeats <= 0;
  const isRegistered = event.isRegistered; // backend should send this

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            {event.name}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organized by {event.organizer}
          </p>
        </div>

        {/* Meta Info */}
        <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">

          <div>
            <p className="font-medium text-slate-800">Location</p>
            <p>{event.location}</p>
          </div>

          <div>
            <p className="font-medium text-slate-800">Date & Time</p>
            <p>
              {new Date(event.dateTime).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="font-medium text-slate-800">Category</p>
            <p>{event.category}</p>
          </div>

        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            About Event
          </h2>
          <p className="text-slate-600 mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Seat Status */}
        <div className="flex items-center justify-between border-t pt-6">

          <div>
            <p className="text-sm text-slate-500">
              Available Seats
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {event.availableSeats}
            </p>
          </div>

          {/* Registration Button */}
          {token && (
            <div>
              {!isRegistered ? (
                <button
                  onClick={handleRegister}
                  disabled={isFull || registering}
                  className={`px-6 py-2 rounded-xl text-white ${
                    isFull
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {registering
                    ? "Processing..."
                    : isFull
                    ? "Event Full"
                    : "Register"}
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  disabled={registering}
                  className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
                >
                  {registering ? "Processing..." : "Cancel Registration"}
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
