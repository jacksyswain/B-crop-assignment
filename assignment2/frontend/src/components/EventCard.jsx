import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold">{event.name}</h3>
      <p className="text-sm text-slate-500">
        {event.location}
      </p>
      <p className="text-sm">
        {new Date(event.dateTime).toLocaleDateString()}
      </p>

      <Link
        to={`/events/${event._id}`}
        className="text-blue-600 text-sm"
      >
        View Details
      </Link>
    </div>
  );
}
