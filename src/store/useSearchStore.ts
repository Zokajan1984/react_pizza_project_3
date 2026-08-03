import { create } from "zustand";

interface SearchStore {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchValue: "",
  setSearchValue: (value) =>
    set({
      searchValue: value,
    }),
}));
