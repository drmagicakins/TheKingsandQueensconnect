// src/credits/Leaderboard.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function Leaderboard() {
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => api.get("/credits/leaderboard/").then((res) => res.data),
  });

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="mb-3 font-bold">Most Active Members</h2>

      {data.map((user, i) => (
        <div key={user.id} className="flex justify-between">
          <span>
            {i + 1}. {user.name}
          </span>
          <span>{user.credits} 🪙</span>
        </div>
      ))}
    </div>
  );
}
