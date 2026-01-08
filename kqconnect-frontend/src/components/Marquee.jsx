// src/components/Marquee.jsx
import { motion } from "framer-motion";

export default function Marquee({ items, icon }) {
  return (
    <div className="overflow-hidden border rounded-lg border-white/10 bg-white/5">
      <div className="flex gap-8 px-6 py-3 animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            {icon} {item}
          </span>
        ))}
      </div>
    </div>
  );
}
