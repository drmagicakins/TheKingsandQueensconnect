// src/components/Input.jsx
export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/20 outline-none"
      />
    </div>
  );
}
