import React from "react";
import { useEvents } from "./useEvents";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function RiskTrendChart() {
  const { events, loading, error } = useEvents();

  if (loading) return <p className="text-gray-400">Loading risk trends…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!events || events.length === 0)
    return <p className="text-gray-500">No event data available.</p>;

  // Group by date and count
  const groups = {};

  events.forEach((evt) => {
    const date = evt.ts.slice(0, 10);
    if (!groups[date]) {
      groups[date] = {
        date,
        low: 0,
        elevated: 0,
        high: 0,
        critical: 0,
      };
    }
    groups[date][evt.risk_level] += 1;
  });

  const chartData = Object.values(groups).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold mb-4">Risk Trend (Daily)</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#1e2636" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line dataKey="low" stroke="#6B7280" strokeWidth={2} />
            <Line dataKey="elevated" stroke="#FBBF24" strokeWidth={2} />
            <Line dataKey="high" stroke="#F97316" strokeWidth={2} />
            <Line dataKey="critical" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
