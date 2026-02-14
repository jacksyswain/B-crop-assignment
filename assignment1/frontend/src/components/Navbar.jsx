import { useAuth } from "../hooks/useAuth";
import Dropdown from "./ui/Dropdown";
import Button from "./ui/Button";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-between px-6 h-16 border-b bg-white">
      
      {/* App Title */}
      <h1 className="text-xl font-semibold tracking-tight">
        Expense Tracker
      </h1>

      {/* User Menu */}
      <Dropdown label="Account">
        <div
          onClick={logout}
          className="px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer"
        >
          Logout
        </div>
      </Dropdown>
      
    </div>
  );
}
