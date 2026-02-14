import { useState } from "react";

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border rounded-lg"
      >
        {label}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow">
          {children}
        </div>
      )}
    </div>
  );
}
