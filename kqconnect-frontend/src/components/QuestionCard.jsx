export default function QuestionCard({ question }) {
  return (
    <div className="p-5 bg-white border rounded-md hover:shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        {question.title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {question.answers_count} answers
      </p>
    </div>
  );
}
