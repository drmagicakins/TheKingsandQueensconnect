// src/components/BirthdayBadge.jsx
export default function BirthdayBadge({ isToday }) {
  if (!isToday) return null;

  return (
    <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
      🎉 Birthday Today
    </span>
  );
}
