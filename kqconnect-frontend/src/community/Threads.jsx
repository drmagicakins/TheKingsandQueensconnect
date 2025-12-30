// src/community/Threads.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Threads() {
  const { data, isLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: () => api.get("/threads/").then(res => res.data),
  });

  if (isLoading) return <p>Loading discussions...</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {data.map(thread => (
        <Link
          to={`/threads/${thread.id}`}
          key={thread.id}
          className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold">{thread.title}</h2>
          <p className="text-sm text-gray-600">
            {thread.category} · {thread.author}
          </p>
          <div className="flex gap-4 text-sm mt-2">
            <span>⬆ {thread.votes}</span>
            <span>💬 {thread.replies_count}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
