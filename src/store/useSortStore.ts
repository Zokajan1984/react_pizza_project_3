import { create } from "zustand";

export type SortTepy = "rating" | "priceAsc" | "priceDesc" | "alphabet";

interface SortStore {
  sortType: SortTepy;
  setSortType: (type: SortTepy) => void;
}

export const useSortStore = create<SortStore>((set) => ({
  sortType: "rating",
  setSortType: (type) => ({ sortType: type }),
}));
