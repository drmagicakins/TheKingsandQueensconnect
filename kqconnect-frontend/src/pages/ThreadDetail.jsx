import { useEffect, useState } from "react";
import { fetchThread, replyToThread } from "../api/discussions";

import ReplyCard from "../components/ReplyCard";
import ReplyForm from "../components/ReplyForm";


const thread = {
  title: "What does it mean to be a Queen in leadership?",
  content:
    "Leadership is not about titles but responsibility, service, and courage.",
  author: {
    name: "Queen Kikelomo",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  created_at: "Jan 10, 2025",
};

const replies = [
  {
    id: 1,
    content: "True leadership is influence. Queens lift others as they rise.",
    author: {
      name: "Queen Esther",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    likes: 8,
    created_at: "1h ago",
  },
];

export default function ThreadDetail() {
  return (
    <section className="col-span-8 space-y-6">
      {/* Thread */}
      <div className="p-6 border bg-white/5 border-white/10 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={thread.author.avatar}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div>
            <p className="font-semibold">{thread.author.name}</p>
            <p className="text-xs text-gray-400">{thread.created_at}</p>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold">{thread.title}</h1>
        <p className="leading-relaxed text-gray-300">{thread.content}</p>

        <div className="flex gap-6 mt-6 text-sm text-gray-400">
          <button className="hover:text-white">❤️ Like</button>
          <button className="hover:text-white">🔖 Save</button>
          <button className="hover:text-white">🚩 Report</button>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Replies ({replies.length})</h2>

        {replies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>

      <ReplyForm />
    </section>
  );
}
export default function ThreadDetail({ id }) {
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchThread(id).then(res => setThread(res.data));
  }, [id]);

  const submitReply = async () => {
    await replyToThread(id, { content: reply });
    setReply("");
    fetchThread(id).then(res => setThread(res.data));
  };

  if (!thread) return null;

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-2 text-2xl font-bold">{thread.title}</h1>
      <p className="mb-6 text-gray-700">{thread.content}</p>

      <h3 className="mb-2 font-semibold">Replies</h3>
      <div className="mb-4 space-y-3">
        {thread.replies.map(r => (
          <div key={r.id} className="p-3 bg-gray-100 rounded-lg">
            <p>{r.content}</p>
            <span className="text-xs text-gray-500">{r.author}</span>
          </div>
        ))}
      </div>

      <textarea
        value={reply}
        onChange={e => setReply(e.target.value)}
        className="w-full p-3 mb-2 border rounded-lg"
        placeholder="Write your reply…"
      />

      <button
        onClick={submitReply}
        className="px-4 py-2 text-white bg-black rounded-lg"
      >
        Reply
      </button>
    </div>
  );
}
