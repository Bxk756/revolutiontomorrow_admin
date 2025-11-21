import React from "react";
import { useUsage } from "./useUsage";
import { useEvents } from "./useEvents";

export default function DashboardStatsBar() {
  const { data } = useUsage();
  const { events } = useEvents();

  const latest = data?.[0] || {};

  const avgLatency = latest.avg_latency || 0;
  const totalAlerts = events.filter(
    (e) => e.risk_level === "high" || e.risk_level === "critical"
  ).length;

  const items = [
    { label: "Calls Today", value: latest.total_calls || 0 },
    { label: "Avg Latency (ms)", value: avgLatency },
    { label: "Alerts (High+)", value: totalAlerts },
    { label: "Uptime", value: latest.uptime || "—" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-[#111622] p-4 rounded-xl border border-gray-800 shadow"
        >
          <p className="text-gray-400 text-xs">{item.label}</p>
          <p className="text-xl font-bold text-blue-400">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
