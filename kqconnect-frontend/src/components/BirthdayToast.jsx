// src/components/BirthdayToast.jsx
export default function BirthdayToast({ isToday }) {
  if (!isToday) return null;

  return (
    <div className="bg-pink-500 text-white p-3 rounded shadow">
      🎉 The Kings & Queens Connect celebrates you today!
    </div>
  );
}
