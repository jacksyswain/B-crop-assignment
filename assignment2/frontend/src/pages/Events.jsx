import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";
import CreateEventModal from "../components/CreateEventModal";

export default function Events() {
  const { token } = useAuth();

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page,
        ...filters
      }).toString();

      const res = await API.get(`/events?${query}`);

      setEvents(res.data.data.events);
      setPages(res.data.data.pages);
    } catch (err) {
      console.log("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this event?");
    if (!confirm) return;

    await API.delete(`/events/${id}`);
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Explore Events
            </h1>
            <p className="text-sm text-slate-500">
              Discover and manage events
            </p>
          </div>

          {token && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl"
            >
              + Create Event
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <EventFilters setFilters={setFilters} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-400 py-10">
            Loading events...
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="text-center text-slate-400 py-16">
            No events found.
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="relative">

              <EventCard event={event} />

              {token && (
                <button
                  onClick={() => handleDelete(event._id)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center">
            <Pagination page={page} pages={pages} setPage={setPage} />
          </div>
        )}

      </div>
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchEvents}
      />

    </div>
  );
}
