import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg text-sm font-medium transition";

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4 hidden md:block">
      
      <div className="mb-8">
        <h2 className="text-lg font-bold">Menu</h2>
      </div>

      <nav className="space-y-2">
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          Transactions
        </NavLink>

      </nav>
    </div>
  );
}
