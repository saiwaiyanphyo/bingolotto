"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const pieces = Array.from({ length: 46 }, (_, index) => index);

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.span
              key={piece}
              initial={{
                x: `${10 + (piece * 17) % 80}vw`,
                y: -24,
                rotate: 0,
                opacity: 1
              }}
              animate={{
                y: "108vh",
                rotate: 280 + piece * 19,
                opacity: [1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.8 + (piece % 8) * 0.1,
                ease: "easeOut"
              }}
              className="absolute h-3 w-2 rounded-sm"
              style={{
                backgroundColor: ["#f7c948", "#e11d48", "#38bdf8", "#10b981", "#f97316"][piece % 5]
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
