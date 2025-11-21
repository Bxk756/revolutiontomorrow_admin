import React from "react";
import { useEvents } from "./useEvents";

export default function AlertsCard() {
  const { events, loading } = useEvents();

  const critical = events.filter((e) => e.risk_level === "critical").length;
  const high = events.filter((e) => e.risk_level === "high").length;

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">Alerts</h2>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-400 text-sm">Critical Alerts</p>
          <p className="text-3xl font-bold text-red-500">{critical}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">High Alerts</p>
          <p className="text-3xl font-bold text-orange-400">{high}</p>
        </div>
      </div>

      {loading && (
        <p className="text-xs text-gray-500 mt-3">Updating...</p>
      )}
    </div>
  );
}
