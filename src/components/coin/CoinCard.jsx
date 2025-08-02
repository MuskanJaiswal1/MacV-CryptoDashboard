"use client";

import WatchButton from "./WatchButton";
import { useRouter } from "next/navigation";

export default function CoinCard({ coin, index }) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/coin/${coin.id}`);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow text-white text-sm cursor-pointer" onClick={handleRowClick}>
      <div className="flex justify-between">
        <span className="font-medium">
          #{index} {coin.name}
        </span>
        <span>{coin.symbol.toUpperCase()}</span>
      </div>
      <div className="mt-2">
        <p>Price: ${coin.current_price.toLocaleString()}</p>
        <p>
          24h %:{" "}
          <span
            className={
              coin.price_change_percentage_24h > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </p>
        <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
      </div>
      <div className="mt-3 flex justify-end" onClick={(e) => e.stopPropagation()}>
        <WatchButton coinId={coin.id} />
      </div>
    </div>
  );
}