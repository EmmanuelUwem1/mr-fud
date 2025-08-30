import { create } from "zustand";

type OcicatTrade = {
  hash: string;
  time: string;
  buyer: string;
  seller: string;
  initiator?: string;
  amount: number;
  bnbAmount: number;
  action: "buy" | "sell";
};

type TradeStore = {
  trades: OcicatTrade[];
  setTrades: (trades: OcicatTrade[]) => void;
  addTrade: (trade: OcicatTrade) => void;
};

export const useTradeStore = create<TradeStore>((set) => ({
  trades: [],
  setTrades: (trades) => set({ trades }),
  addTrade: (trade) =>
    set((state) => {
      const exists = state.trades.some(
        (t) => t.hash === trade.hash && t.time === trade.time
      );
      if (exists) return { trades: state.trades };
      return { trades: [trade, ...state.trades.slice(0, 99)] };
    }),
}));
