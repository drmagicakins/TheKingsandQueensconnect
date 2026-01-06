// src/ads/AdRequest.jsx
import api from "../services/api";
import { useState } from "react";

export default function AdRequest() {
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    await api.post("/ads/request/", form);

    setLoading(false);
    e.target.reset();
    alert("Advert request submitted. Await approval.");
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-xl bg-white p-6 rounded shadow space-y-4"
    >
      <h1 className="text-xl font-bold">Place an Advert</h1>

      <input
        name="title"
        placeholder="Advert title"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="content"
        placeholder="Advert description"
        className="w-full border p-2 rounded"
        rows="4"
        required
      />

      <input type="file" name="payment_proof" required />

      <select name="duration" className="w-full border p-2 rounded">
        <option value="7">7 Days</option>
        <option value="14">14 Days</option>
        <option value="30">30 Days</option>
      </select>

      <button
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Advert"}
      </button>
    </form>
  );
}
