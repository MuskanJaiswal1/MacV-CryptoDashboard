import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSortStore = create(
  persist(
    (set) => ({
      sortBy: "",
      setSortBy: (value) => set({ sortBy: value }),
    }),
    {
      name: 'sort-store', // Key name in localStorage
    }
  )
)

export default useSortStore
