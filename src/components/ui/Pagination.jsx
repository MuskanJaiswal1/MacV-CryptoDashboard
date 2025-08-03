"use client";

import { useRouter } from "next/navigation";

export default function Pagination({ page, setPage, hasNextPage }) {
  const router = useRouter();
  
  const handlePrev = () => {
  if (page > 1) {
    const newPage = page - 1;
    setPage(newPage);
    router.push(`/?page=${newPage}`);
  }
};


  const handleNext = () => {
  if (hasNextPage) {
    const newPage = page + 1;
    setPage(newPage);
    router.push(`/?page=${newPage}`);
  }
};


  return (
    <div className="flex justify-center mt-6 gap-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-gray-300 self-center">Page {page}</span>

      <button
        onClick={handleNext}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}