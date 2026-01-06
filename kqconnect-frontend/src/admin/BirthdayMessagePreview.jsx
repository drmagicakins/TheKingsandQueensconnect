// src/admin/BirthdayMessagePreview.jsx
export default function BirthdayMessagePreview({ message }) {
  return (
    <div className="bg-gray-50 border rounded p-4 text-sm">
      <p className="font-semibold mb-2">Message Preview</p>
      <p>{message}</p>
    </div>
  );
}
