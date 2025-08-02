"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { fetchCoins } from "@/lib/coingecko";
import CoinRow from "@/components/coin/CoinRow";
import CoinCard from "@/components/coin/CoinCard";
import SkeletonRow from "@/components/skeleton/SkeletonRow";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import useSearchStore from "@/store/SearchStore";
import SortBox from "@/components/ui/SortBox";
import SortCoins from "@/utils/SortCoins";
import useSortStore from "@/store/SortStore";

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { query } = useSearchStore();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { sortBy } = useSortStore();

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(query);
    }, 1000);

    handler();
    return () => handler.cancel();
  }, [query]);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const data = await fetchCoins({ page: 1, perPage: 50 });
        setCoins(data);
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCoins();
  }, []);

  const coinsToRender = SortCoins(
    coins.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    ),
    sortBy
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          Top Coins
        </h1>
        <SortBox />
      </div>

      <div className="hidden sm:block overflow-x-auto bg-gray-900 rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse text-sm sm:text-base">
          <thead>
            <tr className="text-left border-b border-gray-700 text-gray-400">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Coin</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">24h %</th>
              <th className="py-3 px-4">Market Cap</th>
              <th className="py-3 px-4">Watch</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, idx) => (
                <SkeletonRow key={idx} />
              ))
            ) : coinsToRender.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No coins found.
                </td>
              </tr>
            ) : (
              coinsToRender.map((coin, i) => (
                <CoinRow key={coin.id} coin={coin} index={i + 1} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden space-y-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : coinsToRender.length === 0 ? (
          <p> No coins found. </p>
        ) : (
          coinsToRender.map((coin, i) => (
            <CoinCard key={coin.id} coin={coin} index={i + 1} />
          ))
        )}
      </div>
    </div>
  );
}
