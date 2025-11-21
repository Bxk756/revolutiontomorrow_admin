import React from "react";
import { useUsage } from "./useUsage";

export default function DashboardCards() {
  const { data, loading } = useUsage();

  if (loading) return <p className="text-gray-400">Loading metrics…</p>;
  if (!data || data.length === 0)
    return <p className="text-gray-500">No usage data yet.</p>;

  const latest = data[0];

  const cards = [
    {
      label: "Total Calls Today",
      value: latest.total_calls,
      color: "text-blue-400",
    },
    {
      label: "High Risk Alerts",
      value: latest.high_risk,
      color: "text-orange-400",
    },
    {
      label: "Critical Alerts",
      value: latest.critical_risk,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow hover:shadow-lg transition transform hover:-translate-y-0.5"
        >
          <p className="text-gray-400 text-sm mb-1">{c.label}</p>
          <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}
