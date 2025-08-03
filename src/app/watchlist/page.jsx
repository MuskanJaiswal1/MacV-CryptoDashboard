'use client';

import { useEffect, useState, useMemo } from 'react';
import useWatchlistStore from '@/store/WatchlistStore';
import { fetchCoinsByIds } from '@/lib/coingecko';
import CoinRow from '@/components/coin/CoinRow';
import CoinCard from '@/components/coin/CoinCard';
import SkeletonRow from '@/components/skeleton/SkeletonRow';
import SkeletonCard from '@/components/skeleton/SkeletonCard';
import useSearchStore from '@/store/SearchStore';
import useSortStore from '@/store/SortStore';
import SortBox from '@/components/ui/SortBox';
import SortCoins from '@/utils/SortCoins';

const SKELETON_COUNT = 6;

export default function WatchlistPage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const watchlist = useWatchlistStore((state) => state.watchlist);
  const { debouncedQuery } = useSearchStore();
  const { sortBy } = useSortStore();

  useEffect(() => {
    const loadCoins = async () => {
      if (watchlist.length === 0) {
        setCoins([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchCoinsByIds(watchlist);
         if (Array.isArray(data)) {
          setCoins(data);
        } else {
          console.warn('Non-array response from fetchCoinsByIds:', data);
          setCoins([]);
        }
      } catch (err) {
        console.error('Error fetching watchlist coins:', err);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    console.log('Watchlist coins:', coins);
    loadCoins();
  }, [watchlist]);


  const filteredCoins = useMemo(() => {
     if (!Array.isArray(coins)) return [];
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [coins, debouncedQuery]);

  const coinsToRender = useMemo(() => {
    const list = debouncedQuery ? filteredCoins : coins;
     if (!Array.isArray(list)) return [];
    return SortCoins([...list], sortBy);
  }, [filteredCoins, coins, debouncedQuery, sortBy]);

  const showEmpty = !loading && coins.length === 0;
  const showNoResults = !loading && coins.length > 0 && coinsToRender.length === 0;

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          My Watchlist
        </h1>
        <SortBox />
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto bg-gray-900 rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
              <th>Watch</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(SKELETON_COUNT)].map((_, i) => <SkeletonRow key={i} />)
            ) : showEmpty ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  Your watchlist is empty. Add some coins to get started.
                </td>
              </tr>
            ) : showNoResults ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No coins match your search.
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

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4 mt-4">
        {loading ? (
          [...Array(SKELETON_COUNT)].map((_, i) => <SkeletonCard key={i} />)
        ) : showEmpty ? (
          <p className="text-center text-gray-400">
            Your watchlist is empty. Add some coins to get started.
          </p>
        ) : showNoResults ? (
          <p className="text-center text-gray-400">
            No coins match your search.
          </p>
        ) : (
          coinsToRender.map((coin, i) => (
            <CoinCard key={coin.id} coin={coin} index={i + 1} />
          ))
        )}
      </div>
    </div>
  );
}
