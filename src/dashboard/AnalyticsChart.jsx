import React from "react";
import { useUsage } from "./useUsage";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart() {
  const { data, loading, error } = useUsage();

  if (loading) return <p className="text-gray-400">Loading analytics…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data || data.length === 0)
    return <p className="text-gray-500">No usage data yet.</p>;

  const chartData = data.map((day) => ({
    date: day.date,
    calls: day.total_calls,
    high: day.high_risk,
    critical: day.critical_risk,
  }));

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold mb-4">API Usage (Last 30 Days)</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#1e2636" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#F97316"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="critical"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
