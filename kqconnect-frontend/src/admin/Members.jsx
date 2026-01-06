// src/admin/Members.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function Members() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-members"],
    queryFn: () => api.get("/admin/members/").then(res => res.data),
  });

  if (isLoading) return "Loading members...";

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Members</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map(user => (
            <MemberRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MemberRow({ user }) {
  const updateStatus = (action) =>
    api.post(`/admin/members/${user.id}/${action}/`);

  return (
    <tr className="border-t">
      <td className="p-2">{user.name}</td>
      <td>{user.email}</td>
      <td>{user.status}</td>
      <td>{user.is_admin ? "Admin" : "Member"}</td>
      <td className="space-x-2">
        <button onClick={() => updateStatus("ban")} className="text-red-600">
          Ban
        </button>
        <button onClick={() => updateStatus("suspend")} className="text-yellow-600">
          Suspend
        </button>
        <button onClick={() => updateStatus("promote")} className="text-green-600">
          Make Admin
        </button>
      </td>
    </tr>
  );
}
