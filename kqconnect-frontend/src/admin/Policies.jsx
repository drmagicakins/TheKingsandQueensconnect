// src/admin/Policies.jsx
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useState } from "react";

export default function Policies() {
  const { data } = useQuery({
    queryKey: ["policies"],
    queryFn: () => api.get("/policies/").then(res => res.data),
  });

  const [content, setContent] = useState("");

  const save = useMutation(() =>
    api.put("/policies/", { content })
  );

  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h1 className="font-bold">Terms & Policy</h1>

      <textarea
        value={content || data.content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        className="w-full border p-2 rounded"
      />

      <button
        onClick={() => save.mutate()}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
