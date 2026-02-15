import { useState } from "react";
import API from "../services/api";

export default function CreateEventModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    organizer: "",
    location: "",
    dateTime: "",
    description: "",
    capacity: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/events", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl">

        <h2 className="text-lg font-semibold">
          Create Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Event Name"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Organizer"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, organizer: e.target.value })
            }
            required
          />

          <input
            placeholder="Location"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            required
          />

          <input
            type="datetime-local"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, dateTime: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Total Capacity"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, capacity: e.target.value })
            }
            required
          />

          <input
            placeholder="Category"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
