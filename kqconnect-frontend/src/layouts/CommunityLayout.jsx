import { Outlet } from "react-router-dom";

export default function CommunityLayout() {
  return (
    <div className="min-h-screen text-white bg-gray-950">
      <header className="flex justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold">👑 Kings & Queens Connect</h1>
        <span className="text-sm text-gray-400">Community Feed</span>
      </header>
      <div className="flex items-center gap-4">
        <CreditBadge />
      </div>

      <main className="grid max-w-6xl grid-cols-12 gap-6 px-6 py-6 mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
