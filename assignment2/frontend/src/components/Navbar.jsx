import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <div className="bg-white border-b p-4 flex justify-between">
      <Link to="/" className="font-semibold">
        Event Platform
      </Link>

      <div className="flex gap-4">
        {token && <Link to="/my-events">My Events</Link>}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
}
