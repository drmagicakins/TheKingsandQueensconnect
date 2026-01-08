import { useState } from "react";
import { createAd } from "../services/adsService";

export default function CreateAd() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    link: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await createAd(form, token);
    alert("Ad submitted. Proceed to payment.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-6 mx-auto space-y-4">
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Link"
        onChange={(e) => setForm({ ...form, link: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button className="px-4 py-2 text-white bg-black rounded">
        Submit Ad
      </button>
    </form>
  );
}
