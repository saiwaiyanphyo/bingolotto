"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FormEvent } from "react";
import { useGameStore } from "@/store/game-store";
import type { PrizeRound, WinnerFormValues } from "@/types/game";

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function WinnerModal({ isOpen, onClose, onSaved }: WinnerModalProps) {
  const saveWinner = useGameStore((state) => state.saveWinner);
  const currentRound = useGameStore((state) => state.currentRound);
  const drawnNumbers = useGameStore((state) => state.drawnNumbers);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: WinnerFormValues = {
      winnerName: String(formData.get("winnerName") ?? ""),
      prizeAmount: Number(formData.get("prizeAmount") ?? 0),
      cardCount: Number(formData.get("cardCount") ?? 0),
      notes: String(formData.get("notes") ?? ""),
      prizeRound: String(formData.get("prizeRound") ?? currentRound) as PrizeRound
    };

    if (!values.winnerName || values.prizeAmount < 0 || values.cardCount < 1) return;
    saveWinner(values);
    onSaved();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 28, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            className="w-full max-w-xl rounded-lg border border-gold/30 bg-[#0b0f19] p-6 shadow-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Winner Found</p>
                <h2 className="text-2xl font-black text-white">Record winner</h2>
                <p className="mt-1 text-sm text-white/55">{drawnNumbers.length} numbers were drawn before this win.</p>
              </div>
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="field sm:col-span-2">
                Winner name
                <input required name="winnerName" autoFocus placeholder="Enter winner name" />
              </label>
              <label className="field">
                Prize amount
                <input required name="prizeAmount" type="number" min={0} step={1} placeholder="5000" />
              </label>
              <label className="field">
                Cards held
                <input required name="cardCount" type="number" min={1} step={1} placeholder="12" />
              </label>
              <label className="field sm:col-span-2">
                Prize round
                <select name="prizeRound" defaultValue={currentRound}>
                  <option>Regular</option>
                  <option>Special</option>
                  <option>Jackpot</option>
                </select>
              </label>
              <label className="field sm:col-span-2">
                Notes
                <textarea name="notes" rows={3} placeholder="Optional notes" />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={onClose} className="h-11 rounded-md bg-white/10 px-5 font-bold text-white">
                Cancel
              </button>
              <button type="submit" className="h-11 rounded-md bg-gold px-5 font-black text-ink shadow-glow">
                Save Winner
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
