"use client";
import useSortStore from "@/store/SortStore";

export default function SortBox() {
  const { sortBy, setSortBy } = useSortStore();

  return (
    <div className="mb-6 flex items-center gap-2">
      <label className="text-white font-medium">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white w-full sm:w-64"
      >
        <option value="">Default</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="marketcap-asc">Market Cap ↑</option>
        <option value="marketcap-desc">Market Cap ↓</option>
        <option value="change-asc">24h % ↑</option>
        <option value="change-desc">24h % ↓</option>
      </select>
    </div>
  );
}
