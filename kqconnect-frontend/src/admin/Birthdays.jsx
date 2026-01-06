// src/admin/Birthdays.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function Birthdays() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-birthdays"],
    queryFn: () => api.get("/admin/birthdays/").then(res => res.data),
  });

  if (isLoading) return "Loading birthdays...";

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">🎂 Birthdays</h1>

      <section>
        <h2 className="font-semibold">Today</h2>
        {data.today.map(user => (
          <BirthdayRow key={user.id} user={user} />
        ))}
      </section>

      <section>
        <h2 className="font-semibold">Tomorrow</h2>
        {data.tomorrow.map(user => (
          <BirthdayRow key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}

function BirthdayRow({ user }) {
  return (
    <div className="flex justify-between bg-white p-3 rounded shadow">
      <span>{user.name}</span>
      <span className="text-sm text-gray-500">{user.birthday}</span>
    </div>
  );
}
