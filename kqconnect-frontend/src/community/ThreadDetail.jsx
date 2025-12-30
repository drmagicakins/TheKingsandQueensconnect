// src/community/ThreadDetail.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function ThreadDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["thread", id],
    queryFn: () => api.get(`/threads/${id}/`).then(res => res.data),
  });

  if (isLoading) return "Loading...";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-gray-600">{data.author}</p>
        <p className="mt-4">{data.body}</p>
      </div>

      <div className="space-y-3">
        {data.replies.map(reply => (
          <div key={reply.id} className="bg-white p-4 rounded shadow">
            <p className="font-medium">{reply.author}</p>
            <p>{reply.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
