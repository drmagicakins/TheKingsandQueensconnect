// src/hooks/useOnlineUsers.js
import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export default function useOnlineUsers() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("online_count", setCount);
    return () => socket.off("online_count");
  }, []);

  return count;
}
