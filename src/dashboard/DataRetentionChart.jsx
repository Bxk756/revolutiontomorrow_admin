import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  YAxis,
  XAxis,
} from "recharts";

export default function DataRetentionChart() {
  const [data, setData] = useState([]);

  async function loadStorageData() {
    try {
      const res = await fetch("/api/storage_retention");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Retention chart load error:", err);
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Data Retention & Storage Usage
      </h2>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#3B82F6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="retention_cap"
              stroke="#EF4444"
              strokeDasharray="4 4"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Shows storage growth and retention threshold.
      </p>
    </div>
  );
}
