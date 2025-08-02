const WATCHLIST_KEY = 'watchlist'

const isBrowser = () => typeof window !== 'undefined'

export const getWatchlist = () => {
  if (!isBrowser()) return []
  const stored = localStorage.getItem(WATCHLIST_KEY)
  return stored ? JSON.parse(stored) : []
}

export const addToWatchlist = (id) => {
  if (!isBrowser()) return
  const list = getWatchlist()
  if (!list.includes(id)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...list, id]))
  }
}

export const removeFromWatchlist = (id) => {
  if (!isBrowser()) return
  const list = getWatchlist().filter(item => item !== id)
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list))
}

export const isInWatchlist = (id) => {
  if (!isBrowser()) return false
  return getWatchlist().includes(id)
}