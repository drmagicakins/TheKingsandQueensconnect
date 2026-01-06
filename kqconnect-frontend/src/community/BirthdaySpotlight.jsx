// src/community/BirthdaySpotlight.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function BirthdaySpotlight() {
  const { data } = useQuery({
    queryKey: ["birthdays-today"],
    queryFn: () => api.get("/birthdays/today/").then(res => res.data),
  });

  if (!data?.length) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-bold text-lg mb-4">🎂 Celebrating Today</h2>

      <div className="flex gap-4 overflow-x-auto">
        {data.map(member => (
          <div
            key={member.id}
            className="min-w-[150px] text-center"
          >
            <img
              src={member.avatar}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="mt-2 font-medium">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
