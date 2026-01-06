// src/components/OnlineBadge.jsx
import useOnlineUsers from "../hooks/useOnlineUsers";

export default function OnlineBadge() {
  const count = useOnlineUsers();

  return (
    <div className="text-sm text-green-600 font-medium">
      ● {count} members online
    </div>
  );
}
