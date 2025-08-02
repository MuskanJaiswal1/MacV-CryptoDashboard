'use client'
import useWatchlistStore from '@/store/WatchlistStore'

export default function WatchButton({ coinId }) {
  const watchlist = useWatchlistStore((state) => state.watchlist)
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist)
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist)

  const inList = watchlist.includes(coinId)

  const toggleWatchlist = () => {
    inList ? removeFromWatchlist(coinId) : addToWatchlist(coinId)
  }

  return (
    <button
      onClick={toggleWatchlist}
      className={`text-xl ${inList ? 'text-yellow-400' : 'text-gray-400'}`}
      title={inList ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      {inList ? '★' : '☆'}
    </button>
  )
}