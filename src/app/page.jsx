"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchCoins } from "@/lib/coingecko";
import CoinRow from "@/components/coin/CoinRow";
import CoinCard from "@/components/coin/CoinCard";
import SkeletonRow from "@/components/skeleton/SkeletonRow";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import SortBox from "@/components/ui/SortBox";
import SortCoins from "@/utils/SortCoins";
import useSearchStore from "@/store/SearchStore";
import useSortStore from "@/store/SortStore";

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { debouncedQuery } = useSearchStore();
  const { sortBy } = useSortStore();

  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const PER_PAGE = 50;

  const SKELETON_COUNT = PER_PAGE;

  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoins({ page, perPage: PER_PAGE });
        setCoins(data);
      } catch (err) {
        setCoins([]);
        console.error("Error fetching coins:", err);
        setError("Failed to load coins.");
      } finally {
        setLoading(false);
      }
    };
    loadCoins();
  }, [page]);

  const coinsToRender = useMemo(() => {
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    return SortCoins(filtered, sortBy);
  }, [coins, debouncedQuery, sortBy]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          Top Coins
        </h1>
        <SortBox />
      </div>

      {/* Desktop View */}
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
              Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
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
                <CoinRow key={coin.id} coin={coin} index={(page - 1) * PER_PAGE + i + 1} />
              ))
            )}
          </tbody>
        </table>
        {!loading && !error && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-gray-300 self-center">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={coins.length < PER_PAGE}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))
        ) : coinsToRender.length === 0 ? (
          <p className="text-center text-gray-400">No coins found.</p>
        ) : (
          coinsToRender.map((coin, i) => (
            <CoinCard key={coin.id} coin={coin} index={i + 1} />
          ))
        )}
      </div>
    </div>
  );
}
