import { useState } from "react";
import axios from "axios";

export default function AnswerForm({ questionId, isAuthenticated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please log in to answer.");
      return;
    }

    if (!content.trim()) {
      alert("Answer cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "/api/discussions/answers/",
        {
          question: questionId,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setContent("");
      window.location.reload(); // temporary, we’ll improve later
    } catch (err) {
      alert("Failed to submit answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="mb-2 text-lg font-semibold">Your Answer</h3>

      {!isAuthenticated && (
        <p className="mb-2 text-sm text-red-500">Log in to post an answer.</p>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="w-full p-3 border rounded-lg"
        placeholder="Write your answer here..."
      />

      <button
        onClick={handleSubmit}
        disabled={!isAuthenticated || loading}
        className="px-4 py-2 mt-3 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Answer"}
      </button>
    </div>
  );
}
