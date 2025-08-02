'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchCoinDetails, fetchMarketChart } from '@/lib/coingecko'
import CoinStats from '@/components/coin/CoinStats'
import CoinChart from '@/components/coin/CoinChart'

export default function CoinDetails() {
  const { id } = useParams()
  const [coin, setCoin] = useState(null)
  const [chartData, setChartData] = useState([])
  const [range, setRange] = useState('7')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coinData, chart] = await Promise.all([
          fetchCoinDetails(id),
          fetchMarketChart(id, range),
        ])
        setCoin(coinData)
        setChartData(chart)
      } catch (err) {
        console.error('Error loading coin data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) loadData()
  }, [id, range])

  if (loading) {
    return (
      <main className="p-6 max-w-4xl mx-auto space-y-4 animate-pulse">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded" />
      </main>
    )
  }

  if (!coin) return <p className="p-6 text-red-500">Coin not found</p>

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
  {/* Header Section */}
  <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex items-center gap-4">
      <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
      <div>
        <h1 className="text-3xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
        <p className="text-gray-500 text-sm">Rank #{coin.market_cap_rank}</p>
      </div>
    </div>
    <div className="text-right sm:text-left">
      <h2 className="text-2xl font-semibold text-green-500">${coin.market_data.current_price.usd.toLocaleString()}</h2>
      <p className={`text-sm ${coin.market_data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {coin.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
      </p>
    </div>
  </section>

  {/* Stats & Chart */}
  <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <CoinStats coin={coin} />
    {chartData.length > 0 && (
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md">
        <CoinChart coinId={id} />
      </div>
    )}
  </section>

  {/* More info */}
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
        <div>
          <h3 className="text-gray-500 text-xs">Market Cap</h3>
          <p className="font-medium">
            ${coin.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-gray-500 text-xs">24h Volume</h3>
          <p className="font-medium">
            ${coin.market_data.total_volume.usd.toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-gray-500 text-xs">Circulating Supply</h3>
          <p className="font-medium">
            {coin.market_data.circulating_supply.toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-gray-500 text-xs">Total Supply</h3>
          <p className="font-medium">
            {coin.market_data.total_supply
              ? coin.market_data.total_supply.toLocaleString()
              : 'N/A'}
          </p>
        </div>
        <div>
          <h3 className="text-gray-500 text-xs">ATH</h3>
          <p className="font-medium">
            ${coin.market_data.ath.usd.toLocaleString()} (
            {coin.market_data.ath_change_percentage.usd.toFixed(2)}% from ATH)
          </p>
        </div>
        <div>
          <h3 className="text-gray-500 text-xs">ATL</h3>
          <p className="font-medium">
            ${coin.market_data.atl.usd.toLocaleString()} (
            {coin.market_data.atl_change_percentage.usd.toFixed(2)}% from ATL)
          </p>
        </div>
      </section>

      {/* Description */}
      {coin.description.en && (
        <section className="prose prose-sm dark:prose-invert max-w-none">
          <h2>About {coin.name}</h2>
          <p>{coin.description.en.split('. ')[0]}.</p>
        </section>
      )}

       {/* Links */}
      <section className="flex flex-wrap gap-4 mt-4">
        {coin.links.homepage[0] && (
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
          >
            Official Website
          </a>
        )}
        {coin.links.blockchain_site[0] && (
          <a
            href={coin.links.blockchain_site[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
          >
            Blockchain Explorer
          </a>
        )}
      </section>
</main>
  )
}