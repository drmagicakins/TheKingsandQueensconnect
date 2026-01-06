// src/admin/Dashboard.jsx
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h1 className="font-bold text-lg">Admin Panel</h1>

        <nav className="space-y-2">
          <Link to="members" className="block hover:underline">
            Members
          </Link>
          <Link to="birthdays" className="block hover:underline">
            Birthdays
          </Link>
          <Link to="messages" className="block hover:underline">
            Broadcast Messages
          </Link>
          <Link to="ads" className="block hover:underline">
            Advert Requests
          </Link>
          <Link to="policies" className="block hover:underline">
            Terms & Policy
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
