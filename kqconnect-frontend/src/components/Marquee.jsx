// src/components/Marquee.jsx
import { motion } from "framer-motion";

export default function Marquee({ items }) {
  return (
    <motion.div
      animate={{ x: ["100%", "-100%"] }}
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="whitespace-nowrap bg-black text-white p-2"
    >
      {items.join(" • ")}
    </motion.div>
  );
}
