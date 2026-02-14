import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const res = await API.get("/registrations/me");
      setEvents(res.data.data);
    };
    fetchMyEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold">My Events</h1>
      {events.map((reg) => (
        <div key={reg._id} className="border p-4 mt-4">
          {reg.event.name}
        </div>
      ))}
    </div>
  );
}
