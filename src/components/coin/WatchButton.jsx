'use client'
import { useEffect, useState } from 'react'
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/lib/watchlist'

export default function WatchButton({ coinId }) {
  const [inList, setInList] = useState(false)

  useEffect(() => {
    setInList(isInWatchlist(coinId))
  }, [coinId])

  const toggleWatchlist = () => {
    if (inList) {
      removeFromWatchlist(coinId)
    } else {
      addToWatchlist(coinId)
    }
    setInList(!inList)
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