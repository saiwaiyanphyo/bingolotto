"use client";

import { useState } from "react";
import { Confetti } from "@/components/Confetti";
import { DealerControls } from "@/components/DealerControls";
import { DrawnNumbersPanel } from "@/components/DrawnNumbersPanel";
import { LotteryMixer } from "@/components/LotteryMixer";
import { StatsPanel } from "@/components/StatsPanel";
import { WinnerHistory } from "@/components/WinnerHistory";
import { WinnerModal } from "@/components/WinnerModal";
import { playSound } from "@/lib/sound";

export function AppShell() {
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const celebrate = () => {
    playSound("winner");
    setConfettiActive(true);
    window.setTimeout(() => setConfettiActive(false), 2200);
  };

  return (
    <>
      <Confetti active={confettiActive} />
      <WinnerModal isOpen={winnerModalOpen} onClose={() => setWinnerModalOpen(false)} onSaved={celebrate} />
      <main className="min-h-screen bg-ink text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-[38rem] w-full bg-[radial-gradient(circle_at_30%_0%,rgba(225,29,72,0.18),transparent_30%),radial-gradient(circle_at_75%_8%,rgba(247,201,72,0.18),transparent_26%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 md:px-6 lg:px-8">
          <header className="flex flex-wrap items-end justify-between gap-4 py-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Dealer Operator System</p>
              <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">Bingo Lottery Draw</h1>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white/65">
              OBS-friendly single-screen layout
            </div>
          </header>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_24rem]">
            <div className="space-y-5">
              <LotteryMixer />
              <DrawnNumbersPanel />
            </div>
            <aside className="space-y-5">
              <StatsPanel />
              <DealerControls onWinnerFound={() => setWinnerModalOpen(true)} />
            </aside>
          </div>

          <WinnerHistory />
        </div>
      </main>
    </>
  );
}
