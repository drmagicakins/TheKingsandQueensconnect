import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import api from "../services/api";

export default function TrendingQuestions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api
      .get("/discussions/trending/")
      .then((res) => setQuestions(res.data))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        <h2 className="mb-6 text-2xl font-bold">Trending Questions</h2>

        <div className="space-y-4">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      </div>
    </section>
  );
}
