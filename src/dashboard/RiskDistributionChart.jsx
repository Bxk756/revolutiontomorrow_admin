import React from "react";
import { useEvents } from "./useEvents";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function RiskDistributionChart() {
  const { events, loading, error } = useEvents();

  if (loading) return <p className="text-gray-400">Loading risk distribution…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const counts = { low: 0, elevated: 0, high: 0, critical: 0 };

  events.forEach((e) => {
    if (counts[e.risk_level] !== undefined) counts[e.risk_level] += 1;
  });

  const data = [
    { name: "Low", value: counts.low },
    { name: "Elevated", value: counts.elevated },
    { name: "High", value: counts.high },
    { name: "Critical", value: counts.critical },
  ];

  const COLORS = ["#6B7280", "#FBBF24", "#F97316", "#EF4444"];

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold mb-4">Risk Level Distribution</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
