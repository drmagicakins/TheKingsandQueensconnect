import { useContext } from "react";
import { CreditContext } from "../context/CreditContext";

export default function CreditBadge() {
  const { credits } = useContext(CreditContext);

  return (
    <div className="px-4 py-1 text-sm text-yellow-300 border rounded-full bg-yellow-500/10 border-yellow-400/30">
      🪙 {credits} Coins
    </div>
  );
}
