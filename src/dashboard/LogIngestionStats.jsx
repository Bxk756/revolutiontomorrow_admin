import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LogIngestionStats() {
  const [stats, setStats] = useState([]);

  async function loadStats() {
    try {
      const res = await fetch("/api/ingestion_stats");
      const json = await res.json();
      setStats(json || []);
    } catch (err) {
      console.error("Log ingestion stats error:", err);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-72">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Log Ingestion Stats
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stats}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="events_per_min"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="errors"
            stroke="#EF4444"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
