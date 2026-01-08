import { useEffect, useState } from "react";
import axios from "axios";
import { saveDraft, loadDraft, clearDraft } from "../utils/draftStorage";

export default function AskQuestionModal({ isOpen, onClose, isAuthenticated }) {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  /* Load saved draft once */
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setTitle(draft.title || "");
      setContent(draft.content || "");
    }
  }, []);

  /* Auto-save draft */
  useEffect(() => {
    saveDraft({ title, content });
  }, [title, content]);

  /* Fetch trending tags only when modal opens */
  useEffect(() => {
    if (!isOpen) return;

    axios
      .get("/api/discussions/tags/trending/")
      .then((res) => setTags(res.data))
      .catch(() => {});
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please log in to publish your question.");
      return;
    }

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "/api/discussions/questions/",
        {
          title,
          content,
          is_draft: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      clearDraft();
      setTitle("");
      setContent("");
      onClose();
    } catch (err) {
      alert("Failed to publish question.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg p-6 bg-white rounded-xl">
        <h2 className="mb-4 text-xl font-semibold">Ask a question</h2>

        {!isAuthenticated && (
          <p className="mb-3 text-sm text-red-500">
            You must log in to submit a question.
          </p>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Question title"
          className="w-full p-3 mb-3 border rounded-lg"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe your question (optional)"
          className="w-full p-3 mb-4 border rounded-lg"
          rows={4}
        />

        {/* Trending Tags */}
        {tags.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Trending topics</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() =>
                    setContent((c) =>
                      c.includes(`#${tag.name}`) ? c : c + ` #${tag.name}`
                    )
                  }
                  className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isAuthenticated || loading}
            className="px-4 py-2 text-white bg-blue-600 rounded disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
