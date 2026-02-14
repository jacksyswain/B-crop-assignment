import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import Pagination from "../components/Pagination";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchEvents = async () => {
    const query = new URLSearchParams({
      page,
      ...filters
    }).toString();

    const res = await API.get(`/events?${query}`);
    setEvents(res.data.data.events);
    setPages(res.data.data.pages);
  };

  useEffect(() => {
    fetchEvents();
  }, [filters, page]);

  return (
    <div className="p-8">
      <EventFilters setFilters={setFilters} />

      <div className="grid grid-cols-3 gap-6 mt-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}
