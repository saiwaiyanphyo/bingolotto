"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface BallProps {
  number: number;
  size?: "sm" | "md" | "lg";
  isNewest?: boolean;
  showNumber?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-xl",
  lg: "h-24 w-24 text-4xl"
};

export function Ball({ number, size = "md", isNewest = false, showNumber = true, className }: BallProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={clsx(
        "relative grid shrink-0 place-items-center rounded-full border border-white/45 font-black text-ink shadow-glow",
        sizeClasses[size],
        isNewest && "ring-4 ring-gold/70",
        className
      )}
      style={{
        background:
          "radial-gradient(circle at 32% 26%, #ffffff 0 8%, #fff3a5 18%, #f7c948 58%, #d99b0d 100%)"
      }}
    >
      <span className="absolute left-3 top-2 h-3 w-5 rounded-full bg-white/45 blur-[1px]" />
      {showNumber && <span className="z-10 tabular-nums drop-shadow-sm">{number}</span>}
    </motion.div>
  );
}
