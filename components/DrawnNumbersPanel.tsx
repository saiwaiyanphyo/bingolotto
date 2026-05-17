"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Ball } from "@/components/Ball";
import { useGameStore } from "@/store/game-store";
import type { SortMode } from "@/types/game";

export function DrawnNumbersPanel() {
  const drawnNumbers = useGameStore((state) => state.drawnNumbers);
  const lastDrawnNumber = useGameStore((state) => state.lastDrawnNumber);
  const [sortMode, setSortMode] = useState<SortMode>("draw");

  const visibleNumbers = useMemo(() => {
    return sortMode === "number" ? [...drawnNumbers].sort((a, b) => a - b) : drawnNumbers;
  }, [drawnNumbers, sortMode]);

  return (
    <section className="min-h-[360px] rounded-lg border border-white/10 bg-panel/88 p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Drawn Numbers</p>
          <h2 className="text-2xl font-black text-white">Call board</h2>
        </div>
        <div className="inline-flex rounded-lg border border-white/10 bg-black/35 p-1">
          {(["draw", "number"] as SortMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSortMode(mode)}
              className={`flex h-9 items-center gap-2 rounded-md px-3 text-sm font-bold transition ${
                sortMode === mode ? "bg-gold text-ink" : "text-white/70 hover:text-white"
              }`}
            >
              <ArrowDownUp className="h-4 w-4" />
              {mode === "draw" ? "Draw order" : "Numerical"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-3">
        <AnimatePresence initial={false}>
          {visibleNumbers.map((number) => (
            <motion.div key={number} layout>
              <Ball number={number} isNewest={number === lastDrawnNumber} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {drawnNumbers.length === 0 && (
        <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-white/15 bg-white/[0.025] text-center">
          <p className="max-w-xs text-sm text-white/55">No balls have been drawn for this round yet.</p>
        </div>
      )}
    </section>
  );
}
