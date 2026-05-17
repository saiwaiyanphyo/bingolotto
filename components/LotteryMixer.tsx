"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { Ball } from "@/components/Ball";
import { useGameStore } from "@/store/game-store";

export function LotteryMixer() {
  const drawnNumbers = useGameStore((state) => state.drawnNumbers);
  const isDrawing = useGameStore((state) => state.isDrawing);
  const lastDrawnNumber = useGameStore((state) => state.lastDrawnNumber);

  const previewBalls = useMemo(() => {
    const drawn = new Set(drawnNumbers);
    return Array.from({ length: 28 }, (_, index) => index + 1).filter((number) => !drawn.has(number));
  }, [drawnNumbers]);

  return (
    <section className="relative overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(247,201,72,0.22),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Thai Lottery Inspired</p>
          <h2 className="mt-1 text-2xl font-black text-white">Single Ball Mixer</h2>
        </div>
        <div className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
          1-90
        </div>
      </div>

      <div className="relative mx-auto mt-6 aspect-square max-w-[520px]">
        <div className="absolute inset-x-[18%] bottom-0 h-[18%] rounded-b-[40%] border border-gold/30 bg-gradient-to-b from-gold/25 to-yellow-950/80" />
        <div className="absolute inset-[8%] rounded-full border border-white/25 bg-white/[0.055] shadow-[inset_0_0_48px_rgba(255,255,255,0.16),inset_0_-44px_70px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <motion.div
            className="absolute inset-[10%] rounded-full border border-white/10"
            animate={{ rotate: isDrawing ? 360 : 0 }}
            transition={{ repeat: isDrawing ? Infinity : 0, duration: 1.4, ease: "linear" }}
          />
          {previewBalls.map((number, index) => {
            const x = 43 + Math.cos(index * 2.13) * (20 + (index % 4) * 3);
            const y = 48 + Math.sin(index * 1.77) * (20 + (index % 5) * 2);
            return (
              <motion.div
                key={number}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{
                  x: isDrawing ? [0, 18, -12, 10, 0] : 0,
                  y: isDrawing ? [0, -14, 9, -8, 0] : 0,
                  rotate: isDrawing ? [0, 140, 260, 360] : 0
                }}
                transition={{
                  repeat: isDrawing ? Infinity : 0,
                  duration: 1.1 + (index % 4) * 0.14,
                  ease: "easeInOut"
                }}
              >
                <Ball number={number} size="sm" showNumber={false} className="shadow-none" />
              </motion.div>
            );
          })}
          <div className="absolute left-[18%] top-[14%] h-16 w-28 rotate-[-26deg] rounded-full bg-white/20 blur-xl" />
        </div>

        <AnimatePresence mode="popLayout">
          {isDrawing && (
            <motion.div
              key="selected-ball-placeholder"
              initial={{ x: "-50%", y: "-50%", scale: 0.6, opacity: 0 }}
              animate={{ x: "112%", y: "120%", scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.9, ease: [0.2, 0.78, 0.2, 1] }}
              className="absolute left-1/2 top-1/2 z-20"
            >
              <div className="h-20 w-20 rounded-full bg-[radial-gradient(circle_at_32%_26%,#ffffff_0_8%,#fff3a5_18%,#f7c948_58%,#d99b0d_100%)] shadow-glow" />
            </motion.div>
          )}
          {!isDrawing && lastDrawnNumber && (
            <motion.div
              key={lastDrawnNumber}
              initial={{ x: "112%", y: "120%", scale: 0.9, opacity: 0 }}
              animate={{ x: "112%", y: "120%", scale: 1, opacity: 1 }}
              className="absolute left-1/2 top-1/2 z-20"
            >
              <Ball number={lastDrawnNumber} size="lg" isNewest />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
