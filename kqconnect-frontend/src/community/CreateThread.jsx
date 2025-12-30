// src/community/CreateThread.jsx
import { categories } from "./categories";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateThread() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    await api.post("/threads/", Object.fromEntries(form));
    navigate("/threads");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h1 className="text-xl font-bold">Start a Discussion</h1>

      <select name="category" className="w-full border p-2 rounded">
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        name="title"
        placeholder="Thread title"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="body"
        placeholder="Share your thoughts..."
        rows="6"
        className="w-full border p-2 rounded"
        required
      />

      <button className="bg-black text-white px-6 py-2 rounded">
        Publish
      </button>
    </form>
  );
}
