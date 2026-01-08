// src/components/OnlineBadge.jsx
import useOnlineUsers from "../hooks/useOnlineUsers";

export default function OnlineBadge() {
  const count = useOnlineUsers();

  return (
    <div className="text-sm font-medium text-green-400">
      🟢 {count} members online
    </div>
  );
}
