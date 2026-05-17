"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { drawRandomBall, remainingBalls } from "@/lib/game";
import type { GameSnapshot, PrizeRound, WinnerFormValues, WinnerRecord } from "@/types/game";

interface GameState extends GameSnapshot {
  isDrawing: boolean;
  lastDrawnNumber: number | null;
  drawBall: () => Promise<number | null>;
  startNewGame: () => void;
  resetGame: () => void;
  undoLastDraw: () => void;
  saveWinner: (values: WinnerFormValues) => WinnerRecord;
  setCurrentRound: (round: PrizeRound) => void;
  clearHistory: () => void;
}

const seedHistory: WinnerRecord[] = [
  {
    id: "mock-1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    winnerName: "Sample Winner",
    prizeAmount: 5000,
    cardCount: 12,
    prizeRound: "Regular",
    notes: "Mock record for export testing.",
    drawnNumbers: [7, 42, 18, 89, 3, 61, 25]
  }
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      drawnNumbers: [],
      history: seedHistory,
      currentRound: "Regular",
      isDrawing: false,
      lastDrawnNumber: null,
      drawBall: async () => {
        const { drawnNumbers, isDrawing } = get();
        if (isDrawing || drawnNumbers.length >= 90) return null;

        const nextBall = drawRandomBall(drawnNumbers);
        if (nextBall === null) return null;

        set({ isDrawing: true });
        await new Promise((resolve) => window.setTimeout(resolve, 900));

        // Commit after the animation delay so rapid clicks cannot draw from a stale pool.
        set((state) => {
          if (state.drawnNumbers.includes(nextBall)) return { isDrawing: false };
          return {
            drawnNumbers: [...state.drawnNumbers, nextBall],
            lastDrawnNumber: nextBall,
            isDrawing: false
          };
        });

        return nextBall;
      },
      startNewGame: () => set({ drawnNumbers: [], lastDrawnNumber: null, isDrawing: false }),
      resetGame: () => set({ drawnNumbers: [], lastDrawnNumber: null, isDrawing: false, currentRound: "Regular" }),
      undoLastDraw: () =>
        set((state) => {
          const nextDrawnNumbers = state.drawnNumbers.slice(0, -1);
          return {
            drawnNumbers: nextDrawnNumbers,
            lastDrawnNumber: nextDrawnNumbers.at(-1) ?? null,
            isDrawing: false
          };
        }),
      saveWinner: (values) => {
        const { drawnNumbers, currentRound } = get();
        const record: WinnerRecord = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          winnerName: values.winnerName.trim(),
          prizeAmount: values.prizeAmount,
          cardCount: values.cardCount,
          prizeRound: values.prizeRound || currentRound,
          notes: values.notes?.trim(),
          drawnNumbers
        };
        set((state) => ({
          history: [record, ...state.history],
          drawnNumbers: [],
          lastDrawnNumber: null,
          isDrawing: false,
          currentRound: values.prizeRound || "Regular"
        }));
        return record;
      },
      setCurrentRound: (round) => set({ currentRound: round }),
      clearHistory: () => set({ history: [] })
    }),
    {
      name: "lottery-drawing-system",
      partialize: (state) => ({
        drawnNumbers: state.drawnNumbers,
        history: state.history,
        currentRound: state.currentRound
      }),
      merge: (persisted, current) => {
        const persistedState = persisted as Partial<GameSnapshot>;
        return {
          ...current,
          ...persistedState,
          drawnNumbers: persistedState.drawnNumbers?.filter((number, index, list) => {
            return number >= 1 && number <= 90 && list.indexOf(number) === index;
          }) ?? [],
          history: persistedState.history?.length ? persistedState.history : current.history,
          lastDrawnNumber: persistedState.drawnNumbers?.at(-1) ?? null,
          isDrawing: false
        };
      }
    }
  )
);

export const selectRemainingCount = (drawnNumbers: number[]) => remainingBalls(drawnNumbers).length;
