import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function PublicQuestions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api
      .get("/discussions/public/")
      .then((res) => setQuestions(res.data))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl px-4 mx-auto">
        <h2 className="mb-6 text-2xl font-bold">Questions people are asking</h2>

        <div className="space-y-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-3 pb-4 border-b rounded cursor-pointer hover:bg-gray-50"
              onClick={() => alert("Please sign in to view full discussion")}
            >
              <Link to={`/questions/${q.id}`}>
                <h3 className="text-lg font-semibold">{q.title}</h3>
              </Link>
              <p className="mt-1 text-sm text-gray-600">{q.preview}</p>

              <span className="text-xs text-gray-400">
                {q.answers_count} answers
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
