export default function ThreadCard({ thread }) {
  return (
    <div className="p-5 transition border bg-white/5 border-white/10 rounded-xl hover:bg-white/10">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={thread.author.avatar}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{thread.author.name}</p>
          <p className="text-xs text-gray-400">
            {thread.category} • {thread.created_at}
          </p>
        </div>
      </div>

      <h2 className="mb-2 text-lg font-bold">{thread.title}</h2>
      <p className="text-gray-300 line-clamp-3">{thread.content}</p>

      <div className="flex gap-6 mt-4 text-sm text-gray-400">
        <span>💬 {thread.replies_count} replies</span>
        <span>❤️ {thread.likes}</span>
      </div>
    </div>
  );
}
