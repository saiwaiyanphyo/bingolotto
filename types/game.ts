export type SortMode = "draw" | "number";

export type PrizeRound = "Regular" | "Special" | "Jackpot";

export interface WinnerRecord {
  id: string;
  createdAt: string;
  winnerName: string;
  prizeAmount: number;
  cardCount: number;
  notes?: string;
  prizeRound: PrizeRound;
  drawnNumbers: number[];
}

export interface WinnerFormValues {
  winnerName: string;
  prizeAmount: number;
  cardCount: number;
  notes?: string;
  prizeRound: PrizeRound;
}

export interface GameSnapshot {
  drawnNumbers: number[];
  history: WinnerRecord[];
  currentRound: PrizeRound;
}
