import ThreadCard from "../components/ThreadCard";

const threads = [
  {
    id: 1,
    title: "What does it mean to be a Queen in leadership?",
    content: "Leadership is service, not position...",
    category: "Leadership",
    author: {
      name: "Queen Kikelomo",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    replies_count: 12,
    likes: 30,
    created_at: "2h ago",
  },
];

export default function CommunityFeed() {
  return (
    <>
      <section className="col-span-8 space-y-4">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </section>

      <aside className="col-span-4 space-y-6">
        <div className="p-4 bg-white/5 rounded-xl">
          <h3 className="mb-3 font-semibold">🔥 Trending</h3>
          <p className="text-sm text-gray-400">
            Wealth creation, leadership, faith
          </p>
          <Marquee
            icon="👑"
            items={[
              "Queen Esther just joined",
              "King Akin posted a new thread",
              "12 members online",
              "Leadership thread trending",
            ]}
          />
        </div>

        <div className="p-4 bg-white/5 rounded-xl">
          <h3 className="mb-3 font-semibold">🎂 Birthdays</h3>
          <p className="text-sm text-gray-400">Queen Esther • Tomorrow</p>
        </div>
      </aside>
    </>
  );
}
