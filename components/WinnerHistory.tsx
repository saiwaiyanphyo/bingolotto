"use client";

import { Download, FileJson, Trash2 } from "lucide-react";
import { currencyFormatter, downloadFile, formatDateTime, makeCsv } from "@/lib/game";
import { useGameStore } from "@/store/game-store";

export function WinnerHistory() {
  const history = useGameStore((state) => state.history);
  const clearHistory = useGameStore((state) => state.clearHistory);

  const exportCsv = () => downloadFile("winner-history.csv", makeCsv(history), "text/csv;charset=utf-8");
  const exportJson = () => downloadFile("winner-history.json", JSON.stringify(history, null, 2), "application/json");

  return (
    <section className="rounded-lg border border-white/10 bg-panel/88 p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Game History</p>
          <h2 className="text-2xl font-black text-white">Winner records</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="icon-button" onClick={exportCsv} disabled={history.length === 0} title="Export CSV">
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button className="icon-button" onClick={exportJson} disabled={history.length === 0} title="Export JSON">
            <FileJson className="h-4 w-4" />
            JSON
          </button>
          <button className="icon-button" onClick={clearHistory} disabled={history.length === 0} title="Clear history">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
          <thead className="text-xs uppercase tracking-[0.16em] text-white/45">
            <tr>
              <th className="px-3 py-2">Date/time</th>
              <th className="px-3 py-2">Winner</th>
              <th className="px-3 py-2">Prize</th>
              <th className="px-3 py-2">Cards</th>
              <th className="px-3 py-2">Round</th>
              <th className="px-3 py-2">Numbers drawn</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id} className="bg-white/[0.045] text-sm text-white/80">
                <td className="rounded-l-md px-3 py-3">{formatDateTime(record.createdAt)}</td>
                <td className="px-3 py-3 font-bold text-white">{record.winnerName}</td>
                <td className="px-3 py-3">{currencyFormatter.format(record.prizeAmount)}</td>
                <td className="px-3 py-3 tabular-nums">{record.cardCount}</td>
                <td className="px-3 py-3">{record.prizeRound}</td>
                <td className="rounded-r-md px-3 py-3">
                  <span className="line-clamp-2 max-w-sm">{record.drawnNumbers.join(", ") || "No balls drawn"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {history.length === 0 && <p className="mt-6 text-center text-sm text-white/55">No winner records saved yet.</p>}
    </section>
  );
}
