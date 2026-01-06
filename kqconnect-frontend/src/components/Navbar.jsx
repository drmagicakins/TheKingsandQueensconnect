// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuthStore } from "../auth/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold">
        Kings & Queens Connect
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/threads">Discussions</Link>
            {user.is_admin && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Join</Link>
          </>
        )}
        <BirthdayBadge isToday={user.is_today} />
      </div>
    </nav>
  );
}
