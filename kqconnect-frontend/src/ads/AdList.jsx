// src/ads/AdList.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function AdList() {
  const { data } = useQuery({
    queryKey: ["active-ads"],
    queryFn: () => api.get("/ads/active/").then(res => res.data),
  });

  if (!data?.length) return null;

  return (
    <div className="space-y-3">
      {data.map(ad => (
        <div
          key={ad.id}
          className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded"
        >
          <h3 className="font-bold">{ad.title}</h3>
          <p>{ad.content}</p>
        </div>
      ))}
    </div>
  );
}
