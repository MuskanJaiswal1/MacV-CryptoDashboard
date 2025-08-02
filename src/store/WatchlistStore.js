import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (id) => {
        const list = get().watchlist
        if (!list.includes(id)) {
          set({ watchlist: [...list, id] })
        }
      },
      removeFromWatchlist: (id) => {
        set({
          watchlist: get().watchlist.filter((coinId) => coinId !== id),
        })
      },
      isInWatchlist: (id) => {
        return get().watchlist.includes(id)
      },
      clearWatchlist: () => {
        set({ watchlist: [] })
      },
    }),
    {
      name: 'watchlist-storage', // key in localStorage
    }
  )
)

export default useWatchlistStore