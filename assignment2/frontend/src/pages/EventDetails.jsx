import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data.data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">{event.name}</h1>
      <p>{event.description}</p>
      <p>Available Seats: {event.availableSeats}</p>
    </div>
  );
}
