import type { WinnerRecord } from "@/types/game";

export const MAX_BALL = 90;

export const createBallPool = () => Array.from({ length: MAX_BALL }, (_, index) => index + 1);

export const remainingBalls = (drawnNumbers: number[]) => {
  const drawn = new Set(drawnNumbers);
  return createBallPool().filter((number) => !drawn.has(number));
};

export const drawRandomBall = (drawnNumbers: number[]) => {
  const pool = remainingBalls(drawnNumbers);
  if (pool.length === 0) return null;
  const index = crypto.getRandomValues(new Uint32Array(1))[0] % pool.length;
  return pool[index];
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export const numberFormatter = new Intl.NumberFormat("en-US");

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));

export const makeCsv = (records: WinnerRecord[]) => {
  const header = [
    "Date/time",
    "Winner name",
    "Prize amount",
    "Card count",
    "Prize round",
    "Numbers drawn before winner",
    "Notes"
  ];
  const rows = records.map((record) => [
    formatDateTime(record.createdAt),
    record.winnerName,
    record.prizeAmount.toString(),
    record.cardCount.toString(),
    record.prizeRound,
    record.drawnNumbers.join(" "),
    record.notes ?? ""
  ]);

  return [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
    .join("\n");
};

export const downloadFile = (fileName: string, contents: string, type: string) => {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
};
