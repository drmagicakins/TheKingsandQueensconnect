import { useContext } from "react";
import { CreditContext } from "../context/CreditContext";

export default function ReplyForm() {
  const { addCredits } = useContext(CreditContext);

  const handleSubmit = () => {
    // API call later
    addCredits(1);
  };

  return (
    <div className="p-4 border bg-white/5 border-white/10 rounded-xl">
      <textarea className="w-full p-3 text-white rounded-lg bg-black/40" />

      <div className="flex justify-end mt-3">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-purple-600 rounded-lg"
        >
          Post Reply (+1 coin)
        </button>
      </div>
    </div>
  );
}
