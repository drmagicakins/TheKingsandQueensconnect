// src/components/SmartMarquee.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SmartMarquee({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      4000
    );
    return () => clearInterval(timer);
  }, [items]);

  return (
    <div className="overflow-hidden bg-black text-white py-2">
      <motion.div
        key={index}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {items[index]}
      </motion.div>
    </div>
  );
}
