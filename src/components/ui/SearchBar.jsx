"use client";
import useSearchStore from "@/store/SearchStore";

export default function SearchBar() {
  const { query, setQuery } = useSearchStore();
  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search coins..."
        className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white w-full sm:w-64"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white text-sm"
          aria-label="Clear search"
        >
          X
        </button>
      )}
    </div>
  );
}
