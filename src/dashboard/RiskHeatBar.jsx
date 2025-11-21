import React from "react";
import { useEvents } from "./useEvents";

export default function RiskHeatBar() {
  const { events } = useEvents();

  const counts = {
    low: 0,
    elevated: 0,
    high: 0,
    critical: 0,
  };

  events.forEach((evt) => {
    if (counts[evt.risk_level] !== undefined) {
      counts[evt.risk_level]++;
    }
  });

  const total = Math.max(1, events.length);

  const segments = [
    { label: "Low", value: counts.low, color: "bg-gray-600" },
    { label: "Elevated", value: counts.elevated, color: "bg-yellow-500" },
    { label: "High", value: counts.high, color: "bg-orange-500" },
    { label: "Critical", value: counts.critical, color: "bg-red-600" },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-200 mb-2">Risk Heat Bar</h2>

      <div className="flex w-full h-4 rounded overflow-hidden border border-gray-800">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`${s.color}`}
            style={{ width: `${(s.value / total) * 100}%` }}
            title={`${s.label}: ${s.value}`}
          />
        ))}
      </div>
    </div>
  );
}
