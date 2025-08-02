export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-800 p-4 rounded-lg shadow space-y-3 text-white text-sm">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="space-y-2 mt-2">
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
      <div className="flex justify-end mt-3">
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  );
}
