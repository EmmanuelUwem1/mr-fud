import { create } from "zustand";

type Holder = {
  address: string;
  percent: number;
  value: string;
};

type HoldersState = {
  holders: Holder[];
  loading: boolean;
  setHolders: (holders: Holder[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useHoldersStore = create<HoldersState>((set) => ({
  holders: [],
  loading: true,
  setHolders: (holders) => set({ holders }),
  setLoading: (loading) => set({ loading }),
}));
