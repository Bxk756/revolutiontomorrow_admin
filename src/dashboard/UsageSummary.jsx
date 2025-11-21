import React from "react";
import { useUsage } from "./useUsage";

export default function UsageSummary() {
  const { data, loading, error } = useUsage();

  if (loading) return <p className="text-gray-400">Loading usage…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data || data.length === 0)
    return <p className="text-gray-500">No usage data yet.</p>;

  // Latest day metrics
  const latest = data[0];

  const cards = [
    {
      label: "API Calls (Today)",
      value: latest.total_calls,
      color: "text-blue-400",
    },
    {
      label: "High Risk",
      value: latest.high_risk,
      color: "text-orange-400",
    },
    {
      label: "Critical Risk",
      value: latest.critical_risk,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow-md"
        >
          <p className="text-gray-400 text-sm mb-1">{c.label}</p>
          <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}
