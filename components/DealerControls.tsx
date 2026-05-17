"use client";

import { Expand, Play, RotateCcw, StepBack, Trophy, Wand2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { playSound } from "@/lib/sound";
import { selectRemainingCount, useGameStore } from "@/store/game-store";
import type { PrizeRound } from "@/types/game";

interface DealerControlsProps {
  onWinnerFound: () => void;
}

export function DealerControls({ onWinnerFound }: DealerControlsProps) {
  const drawnNumbers = useGameStore((state) => state.drawnNumbers);
  const isDrawing = useGameStore((state) => state.isDrawing);
  const drawBall = useGameStore((state) => state.drawBall);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const resetGame = useGameStore((state) => state.resetGame);
  const undoLastDraw = useGameStore((state) => state.undoLastDraw);
  const currentRound = useGameStore((state) => state.currentRound);
  const setCurrentRound = useGameStore((state) => state.setCurrentRound);
  const [autoDraw, setAutoDraw] = useState(false);
  const [speed, setSpeed] = useState(3);
  const autoDrawRef = useRef<number | null>(null);
  const remaining = selectRemainingCount(drawnNumbers);

  const handleDraw = useCallback(async () => {
    if (isDrawing || remaining === 0) return;
    playSound("roll");
    const drawn = await drawBall();
    if (drawn) playSound("select");
  }, [drawBall, isDrawing, remaining]);

  useEffect(() => {
    if (!autoDraw || remaining === 0) {
      if (autoDrawRef.current) window.clearInterval(autoDrawRef.current);
      autoDrawRef.current = null;
      return;
    }
    autoDrawRef.current = window.setInterval(handleDraw, speed * 1000);
    return () => {
      if (autoDrawRef.current) window.clearInterval(autoDrawRef.current);
    };
  }, [autoDraw, handleDraw, remaining, speed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === "Space") {
        event.preventDefault();
        void handleDraw();
      }
      if (event.key.toLowerCase() === "u") undoLastDraw();
      if (event.key.toLowerCase() === "w") onWinnerFound();
      if (event.key.toLowerCase() === "f" && document.fullscreenEnabled) {
        document.fullscreenElement ? void document.exitFullscreen() : void document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDraw, onWinnerFound, undoLastDraw]);

  return (
    <section className="rounded-lg border border-white/10 bg-panel/88 p-5 shadow-2xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Dealer Controls</p>
        <h2 className="text-2xl font-black text-white">Operator desk</h2>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button className="control-button bg-gold text-ink" disabled={isDrawing || remaining === 0} onClick={handleDraw}>
          <Play className="h-5 w-5" />
          Draw Ball
        </button>
        <button className="control-button bg-ruby text-white" disabled={isDrawing} onClick={onWinnerFound}>
          <Trophy className="h-5 w-5" />
          Winner Found
        </button>
        <button className="control-button bg-white/10 text-white" disabled={isDrawing} onClick={startNewGame}>
          <Wand2 className="h-5 w-5" />
          Start New Game
        </button>
        <button className="control-button bg-white/10 text-white" disabled={isDrawing || drawnNumbers.length === 0} onClick={undoLastDraw}>
          <StepBack className="h-5 w-5" />
          Undo Last Draw
        </button>
        <button className="control-button bg-white/10 text-white" disabled={isDrawing} onClick={resetGame}>
          <RotateCcw className="h-5 w-5" />
          Reset Game
        </button>
        <button
          className="control-button bg-white/10 text-white"
          onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())}
        >
          <Expand className="h-5 w-5" />
          Fullscreen
        </button>
      </div>

      <div className="mt-5 space-y-4 rounded-lg border border-white/10 bg-black/25 p-4">
        <label className="flex items-center justify-between gap-3 text-sm font-bold text-white">
          Auto draw
          <input
            type="checkbox"
            checked={autoDraw}
            onChange={(event) => setAutoDraw(event.target.checked)}
            className="h-5 w-5 accent-gold"
          />
        </label>
        <label className="block text-sm font-bold text-white">
          Speed: {speed}s
          <input
            min={1}
            max={10}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            type="range"
            className="mt-2 w-full accent-gold"
          />
        </label>
        <label className="block text-sm font-bold text-white">
          Prize round
          <select
            value={currentRound}
            onChange={(event) => setCurrentRound(event.target.value as PrizeRound)}
            className="mt-2 h-11 w-full rounded-md border border-white/10 bg-black/40 px-3 text-white outline-none focus:border-gold"
          >
            <option>Regular</option>
            <option>Special</option>
            <option>Jackpot</option>
          </select>
        </label>
      </div>
    </section>
  );
}
