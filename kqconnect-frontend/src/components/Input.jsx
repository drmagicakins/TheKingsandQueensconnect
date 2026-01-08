// src/components/Input.jsx
export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
    </div>
  );
}

