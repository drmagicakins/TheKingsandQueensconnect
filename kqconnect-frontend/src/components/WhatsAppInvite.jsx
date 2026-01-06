// src/components/WhatsAppInvite.jsx
import { inviteMessage } from "../utils/inviteMessage";

export default function WhatsAppInvite() {
  const url = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Invite via WhatsApp
    </a>
  );
}
