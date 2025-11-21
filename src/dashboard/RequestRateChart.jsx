import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";

export default function RequestRateChart() {
  const [data, setData] = useState([]);

  async function fetchRates() {
    try {
      const res = await fetch("/api/request_rate");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error loading request rates:", err);
    }
  }

  useEffect(() => {
    fetchRates();
    const int = setInterval(fetchRates, 5000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Requests Per Minute
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
              dataKey="rpm"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
