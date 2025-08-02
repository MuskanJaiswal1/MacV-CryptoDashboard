export default function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-gray-800">
      <td className="py-4">
        <div className="h-4 w-4 bg-gray-600 rounded"></div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-600 rounded-full" />
          <div className="flex flex-col">
            <div className="h-4 w-24 bg-gray-600 rounded" />
            <div className="h-3 w-12 bg-gray-700 rounded mt-1" />
          </div>
        </div>
      </td>
      <td><div className="h-4 w-20 bg-gray-600 rounded" /></td>
      <td><div className="h-4 w-16 bg-gray-600 rounded" /></td>
      <td><div className="h-4 w-24 bg-gray-600 rounded" /></td>
      <td><div className="h-4 w-6 bg-gray-600 rounded" /></td>
    </tr>
  );
}