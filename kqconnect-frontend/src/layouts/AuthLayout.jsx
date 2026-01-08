import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <Outlet />
      </div>
    </div>
  );
}
