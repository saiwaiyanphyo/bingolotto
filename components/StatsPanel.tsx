"use client";

import { CircleDot, History, Trophy } from "lucide-react";
import { selectRemainingCount, useGameStore } from "@/store/game-store";
import { numberFormatter } from "@/lib/game";

export function StatsPanel() {
  const drawnNumbers = useGameStore((state) => state.drawnNumbers);
  const history = useGameStore((state) => state.history);
  const currentRound = useGameStore((state) => state.currentRound);
  const remaining = selectRemainingCount(drawnNumbers);

  const stats = [
    { label: "Remaining", value: remaining, icon: CircleDot },
    { label: "Drawn", value: drawnNumbers.length, icon: History },
    { label: "Winners", value: history.length, icon: Trophy }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
          <div className="flex items-center justify-between text-white/60">
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">{label}</span>
            <Icon className="h-4 w-4" />
          </div>
          <p className="mt-2 text-3xl font-black tabular-nums text-white">{numberFormatter.format(value)}</p>
        </div>
      ))}
      <div className="rounded-lg border border-gold/25 bg-gold/10 p-4 sm:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold/80">Active Prize Round</p>
        <p className="mt-1 text-xl font-bold text-white">{currentRound}</p>
      </div>
    </section>
  );
}
