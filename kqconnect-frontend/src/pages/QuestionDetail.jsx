import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnswerForm from "../components/AnswerForm";
import Navbar from "../components/Navbar";
import VoteButtons from "../components/VoteButtons";

function Answers({ questionId }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`/api/discussions/questions/${questionId}/answers/`)
      .then((res) => res.json())
      .then((data) => setAnswers(data))
      .catch(() => {});
  }, [questionId]);

  if (!answers.length) {
    return <p className="text-gray-500">No answers yet.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {answers.map((answer) => (
        <div key={answer.id} className="p-4 bg-white rounded shadow">
          <p className="text-gray-800">{answer.content}</p>
          <small className="text-gray-500">— {answer.user}</small>
        </div>
      ))}
    </div>
  );
}

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("access");

  useEffect(() => {
    axios
      .get(`/api/discussions/questions/${id}/`)
      .then((res) => {
        setQuestion(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading…</p>;
  }

  if (!question) {
    return <p className="p-6">Question not found.</p>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl p-6 mx-auto">
        {/* Question */}
        <h1 className="mb-2 text-2xl font-bold">{question.title}</h1>
        <p className="mb-4 text-sm text-gray-500">Asked by {question.user}</p>
        <p className="mb-6 text-gray-700">{question.content}</p>
        <ReportButton questionId={question.id} />
        <Answers questionId={id} />

        <VoteButtons
          type="questions"
          id={question.id}
          initialScore={question.votes_count}
        />

        {/* Answers */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">
            {question.answers.length} Answers
          </h2>

          {question.answers.map((answer) => (
            <div key={answer.id} className="p-4 mb-4 border rounded-lg">
              <p className="mb-2">{answer.content}</p>
              <ReportButton answerId={answer.id} />
              <VoteButtons
                type="answers"
                id={answer.id}
                initialScore={answer.votes_count}
              />

              <span className="text-sm text-gray-500">— {answer.user}</span>
            </div>
          ))}
        </div>

        {/* Answer Form */}
        <AnswerForm
          questionId={question.id}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </>
  );
}
