import { useState } from "react";

export default function EventFilters({ setFilters }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setFilters({ search });
  };

  return (
    <div className="flex gap-4">
      <input
        className="border p-2 rounded"
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
