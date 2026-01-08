import { useEffect, useState } from "react";
import { fetchThreads } from "../api/discussions";

export default function Threads() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetchThreads().then(res => setThreads(res.data));
  }, []);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Community Discussions</h1>

      <div className="space-y-4">
        {threads.map(t => (
          <a
            key={t.id}
            href={`/threads/${t.id}`}
            className="block p-4 transition bg-white shadow rounded-xl hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="text-sm text-gray-600">
              By {t.author} • {t.views} views
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
