// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuthStore } from "../auth/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="flex justify-between px-6 py-3 bg-white shadow">
      <Link to="/" className="font-bold">
        Kings & Queens Connect
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/threads">Discussions</Link>
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/thread/:id"
              element={
                <ProtectedRoute>
                  <CommunityLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ThreadDetail />} />
            </Route>

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
