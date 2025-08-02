import { create } from 'zustand'

const useSortStore = create((set) => ({
  sortBy: "",
  setSortBy: (value) => set({ sortBy: value }),
}));

export default useSortStore;