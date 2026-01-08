import axios from "axios";
import { useState } from "react";

export default function ReportButton({ questionId, answerId }) {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("access");

  const submitReport = async (reason) => {
    await axios.post(
      "/api/discussions/reports/",
      {
        question: questionId,
        answer: answerId,
        reason,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setOpen(false);
    alert("Report submitted");
  };

  if (!token) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-sm text-red-500">
        Report
      </button>

      {open && (
        <div className="absolute z-10 p-2 bg-white border rounded shadow">
          {["spam", "abuse", "misinformation", "irrelevant"].map((r) => (
            <button
              key={r}
              onClick={() => submitReport(r)}
              className="block w-full px-2 py-1 text-left hover:bg-gray-100"
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
