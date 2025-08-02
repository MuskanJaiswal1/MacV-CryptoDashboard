'use client'

import Link from 'next/link'
import SearchBar from '@/components/ui/SearchBar'

export default function Navbar({query, setQuery}) {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-md">
      <h1 className="text-2xl font-extrabold tracking-wide text-white">
        💰 CryptoDash
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex space-x-6 text-sm sm:text-base">
          <Link
            href="/"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/watchlist"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Watchlist
          </Link>
        </div>

        <SearchBar query={query} setQuery={setQuery} />
      </div>
    </nav>
  )
}
