// src/admin/AdminAds.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function AdminAds() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-ads"],
    queryFn: () => api.get("/admin/ads/").then(res => res.data),
  });

  const approve = async (id) => {
    await api.post(`/admin/ads/${id}/approve/`);
    refetch();
  };

  if (isLoading) return "Loading adverts...";

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Advert Requests</h1>

      {data.map(ad => (
        <div key={ad.id} className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">{ad.title}</h2>
          <p className="text-sm">{ad.content}</p>
          <p className="text-xs text-gray-500">
            Duration: {ad.duration} days
          </p>

          <button
            onClick={() => approve(ad.id)}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
          >
            Approve & Activate
          </button>
        </div>
      ))}
    </div>
  );
}
