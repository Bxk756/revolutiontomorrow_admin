import React from "react";
import { useEvents } from "./useEvents";

export default function AlertsTimeline() {
  const { events, loading } = useEvents();

  const important = events.filter(
    (e) => e.risk_level === "high" || e.risk_level === "critical"
  );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Alerts Timeline
      </h2>

      <div className="border-l border-gray-700 pl-5 space-y-6">
        {important.map((ev) => (
          <div key={ev.id} className="relative">
            <span className="absolute -left-[13px] w-3 h-3 rounded-full bg-red-500" />

            <p className="text-gray-200 text-sm font-semibold">
              {ev.event_type}
            </p>
            <p className="text-gray-500 text-xs">{ev.ts}</p>
            <p className="text-gray-400 text-xs mt-1">{ev.input_snip}</p>
          </div>
        ))}

        {important.length === 0 && (
          <p className="text-gray-500 text-sm">No high-level alerts today.</p>
        )}
      </div>
    </div>
  );
}
