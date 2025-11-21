import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function APILatencyChart() {
  const [data, setData] = useState([]);

  async function fetchLatency() {
    try {
      const res = await fetch("/api/latency");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Latency fetch failed:", err);
    }
  }

  useEffect(() => {
    fetchLatency();
    const int = setInterval(fetchLatency, 20000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        API Latency (ms)
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="latency_ms"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
