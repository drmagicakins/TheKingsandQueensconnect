// src/credits/Wallet.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function Wallet() {
  const { data } = useQuery({
    queryKey: ["credits"],
    queryFn: () => api.get("/credits/").then(res => res.data),
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold">Your Credits</h2>
      <p className="text-3xl">{data.balance} 🪙</p>
      <p className="text-sm text-gray-500">
        100 credits required to place ads
      </p>
    </div>
  );
}
