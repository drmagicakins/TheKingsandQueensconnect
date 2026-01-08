export default function ReplyCard({ reply }) {
  return (
    <div className="p-4 border bg-white/5 border-white/10 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={reply.author.avatar}
          className="w-8 h-8 rounded-full"
          alt=""
        />
        <div>
          <p className="text-sm font-semibold">{reply.author.name}</p>
          <p className="text-xs text-gray-400">{reply.created_at}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-gray-300">
        {reply.content}
      </p>

      <div className="flex gap-4 mt-3 text-xs text-gray-400">
        <button className="hover:text-white">👍 {reply.likes}</button>
        <button className="hover:text-white">Reply</button>
      </div>
    </div>
  );
}
