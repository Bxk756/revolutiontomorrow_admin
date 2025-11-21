import React from "react";

export default function RiskBadgeLegend() {
  const items = [
    { label: "Low", color: "bg-gray-700 text-gray-200" },
    { label: "Elevated", color: "bg-yellow-500 text-black" },
    { label: "High", color: "bg-orange-500 text-black" },
    { label: "Critical", color: "bg-red-600 text-white" },
  ];

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      {items.map((i) => (
        <span
          key={i.label}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${i.color}`}
        >
          {i.label}
        </span>
      ))}
    </div>
  );
}
