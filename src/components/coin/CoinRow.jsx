import { useRouter } from "next/navigation";
import WatchButton from "@/components/coin/WatchButton";

export default function CoinRow({ coin, index }) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/coin/${coin.id}`);
  };

  return (
    <tr className="border-b hover:bg-gray-500 transition cursor-pointer" onClick={handleRowClick}>
      <td className="py-2 px-4 text-sm text-gray-600">{index}</td>

      <td className="flex items-center gap-2 py-2 px-4">
        <img src={coin.image} alt={coin.name} className="w-5 h-5" />
        {coin.name} ({coin.symbol.toUpperCase()})
      </td>

      <td className="py-2 px-4 ">${coin.current_price.toLocaleString()}</td>

      <td
        className={`py-2 px-4 ${
          coin.price_change_percentage_24h >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </td>

      <td className="py-2 px-4">${coin.market_cap.toLocaleString()}</td>

      <td className="py-2 px-4 text-center" onClick={(e) => e.stopPropagation()}>
        <WatchButton coinId={coin.id} />
      </td>
    </tr>
  );
}
