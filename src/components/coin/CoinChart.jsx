"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";
import { fetchMarketChart } from "@/lib/coingecko";

export default function CoinChart({ coinId }) {
  const ranges = [
    // { label: "24H", value: "1" },
    { label: "7D", value: "7" },
    { label: "30D", value: "30" },
    { label: "90D", value: "90" },
    { label: "1Y", value: "365" },
  ];
  const [range, setRange] = useState("7");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadChartData() {
      setLoading(true);
      const result = await fetchMarketChart(coinId, range);
      setData(result);
      setLoading(false);
    }
    loadChartData();
  }, [coinId, range]);

  return (
    <div className="mt-10 w-full bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Price Chart
        </h2>
        <div className="flex flex-wrap gap-2">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded-md text-sm border transition ${
                range === r.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderRadius: "0.5rem",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
