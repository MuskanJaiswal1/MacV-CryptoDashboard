export default function CoinStats({ coin }) {
  const data = coin.market_data;

  const StatRow = ({ label, value, isPercentage }) => (
    <div className="flex justify-between items-center py-2 px-3 bg-gray-700/50 rounded-md text-sm sm:text-base">
      <span className="text-gray-300">{label}</span>
      <span
        className={`text-white font-semibold ${
          isPercentage && value < 0
            ? 'text-red-400'
            : isPercentage
            ? 'text-green-400'
            : ''
        }`}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div className="text-base bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
      {/* Price Data Section */}
      <div className="bg-gray-900 p-4 rounded-lg space-y-2">
        <h3 className="text-indigo-400 font-semibold mb-2 text-lg">
          Price Data
        </h3>
        <StatRow label="Price" value={`$${data.current_price.usd.toLocaleString()}`} />
        <StatRow label="24h Low" value={`$${data.low_24h.usd.toLocaleString()}`} />
        <StatRow label="24h High" value={`$${data.high_24h.usd.toLocaleString()}`} />
        <StatRow
          label="Price Change (24h)"
          value={`${data.price_change_percentage_24h.toFixed(2)}%`}
          isPercentage={true}
        />
      </div>

      {/* Market Info Section */}
      <div className="bg-gray-900 p-4 rounded-lg space-y-2">
        <h3 className="text-indigo-400 font-semibold mb-2 text-lg">
          Market Info
        </h3>
        <StatRow label="Rank" value={coin.market_cap_rank} />
        <StatRow label="Market Cap" value={`$${data.market_cap.usd.toLocaleString()}`} />
        <StatRow label="24h Volume" value={`$${data.total_volume.usd.toLocaleString()}`} />
        <StatRow
          label="Circulating Supply"
          value={data.circulating_supply?.toLocaleString() || 'N/A'}
        />
        <StatRow
          label="Total Supply"
          value={data.total_supply?.toLocaleString() || 'N/A'}
        />
        <StatRow
          label="Max Supply"
          value={data.max_supply?.toLocaleString() || '∞'}
        />
      </div>
    </div>
  );
}