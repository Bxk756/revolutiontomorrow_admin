import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function APIUsageScatterPlot() {
  const [points, setPoints] = useState([]);

  async function loadPoints() {
    try {
      const res = await fetch("/api/api_usage");
      const json = await res.json();
      setPoints(json || []);
    } catch (err) {
      console.error("API usage scatter error:", err);
    }
  }

  useEffect(() => {
    loadPoints();
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10 h-72">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        API Usage Scatter Plot
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="payload_kb" name="Payload (KB)" stroke="#6b7280" />
          <YAxis dataKey="latency_ms" name="Latency (ms)" stroke="#6b7280" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          <Scatter data={points} fill="#3B82F6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
