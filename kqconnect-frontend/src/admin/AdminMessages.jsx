// src/admin/AdminMessages.jsx
import api from "../services/api";

export default function AdminMessages() {
  const sendMessage = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    await api.post("/admin/messages/broadcast/", {
      message: form.get("message"),
    });

    e.target.reset();
  };

  return (
    <form
      onSubmit={sendMessage}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h1 className="font-bold text-lg">Broadcast Message</h1>

      <textarea
        name="message"
        rows="5"
        className="w-full border p-2 rounded"
        placeholder="Send message to all members"
        required
      />

      <button className="bg-black text-white px-6 py-2 rounded">
        Send
      </button>
    </form>
  );
}
