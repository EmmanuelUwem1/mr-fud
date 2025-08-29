import { create } from "zustand";

type Trade = {
  hash: string;
  time: string;
  amount: number;
  price: number;
  symbol: string;
};

export const useTradeStore = create<{
  trades: Trade[];
  addTrade: (trade: Trade) => void;
}>((set) => ({
  trades: [],
  addTrade: (trade) =>
    set((state) => ({ trades: [trade, ...state.trades].slice(0, 50) })),
}));
