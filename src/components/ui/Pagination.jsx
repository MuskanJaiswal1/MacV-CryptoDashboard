"use client";

export default function Pagination({ page, onPageChange, hasNextPage }) {
  return (
    <div className="flex justify-center mt-6 gap-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-gray-300 self-center">Page {page}</span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
