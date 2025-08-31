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
  loaded: boolean;
  setTrades: (trades: OcicatTrade[]) => void;
  addTrade: (trade: OcicatTrade) => void;
  setLoaded: (loaded: boolean) => void;
};

export const useTradeStore = create<TradeStore>((set) => ({
  trades: [],
  loaded: false,
  setTrades: (trades) => set({ trades }),
  addTrade: (trade) =>
    set((state) => {
      const exists = state.trades.some(
        (t) => t.hash === trade.hash && t.time === trade.time
      );
      if (exists) return { trades: state.trades };
      return { trades: [trade, ...state.trades.slice(0, 99)] };
    }),
  setLoaded: (loaded) => set({ loaded }),
}));
