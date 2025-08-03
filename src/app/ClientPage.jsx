"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCoins } from "@/lib/coingecko";
import CoinRow from "@/components/coin/CoinRow";
import CoinCard from "@/components/coin/CoinCard";
import SkeletonRow from "@/components/skeleton/SkeletonRow";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import Pagination from "@/components/ui/Pagination";
import SortBox from "@/components/ui/SortBox";
import SortCoins from "@/utils/SortCoins";
import useSearchStore from "@/store/SearchStore";
import useSortStore from "@/store/SortStore";

export default function ClientPage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { debouncedQuery } = useSearchStore();
  const { sortBy } = useSortStore();

  const PER_PAGE = 50;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const [page, setPage] = useState(initialPage);

  const SKELETON_COUNT = PER_PAGE;

  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoins({ page, perPage: PER_PAGE });
         if (Array.isArray(data)) {
          setCoins(data);
        } else {
          console.warn('Non-array response from fetchCoinsByIds:', data);
          setCoins([]);
        }
      } catch (err) {
        setCoins([]);
        console.error("Error fetching coins:", err);
        setError("Failed to load coins.");
      } finally {
        setLoading(false);
      }
    };
    console.log("Coins loaded:", coins);
    loadCoins();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.replace(`/?page=${newPage}`, { scroll: false });
  };


  const coinsToRender = useMemo(() => {
    if (!Array.isArray(coins)) return [];
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    return SortCoins(filtered, sortBy);
  }, [coins, debouncedQuery, sortBy]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Top Coins</h1>
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
              Array.from({ length: SKELETON_COUNT }).map((_, idx) => <SkeletonRow key={idx} />)
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
          <Pagination
            page={page}
            onPageChange={handlePageChange}
            hasNextPage={coins.length === PER_PAGE}
          />
        )}
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : coinsToRender.length === 0 ? (
          <p className="text-center text-gray-400">No coins found.</p>
        ) : (
          coinsToRender.map((coin, i) => (
            <CoinCard key={coin.id} coin={coin} index={(page - 1) * PER_PAGE + i + 1} />
          ))
        )}
        {!loading && !error && (
          <Pagination
            page={page}
            onPageChange={handlePageChange}
            hasNextPage={coins.length === PER_PAGE}
          />
        )}
      </div>
    </div>
  );
}
