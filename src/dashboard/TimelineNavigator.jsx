import React from "react";
import { useEvents } from "./useEvents";

export default function TimelineNavigator({ onSelect }) {
  const { events } = useEvents();

  if (!events.length) {
    return (
      <p classnName="text-gray-500 text-sm">No events to display.</p>
    );
  }

  const timestamps = events.map((e) => ({
    id: e.id,
    ts: e.ts,
    risk: e.risk_level,
  }));

  const color = (risk) =>
    risk === "critical"
      ? "bg-red-600"
      : risk === "high"
      ? "bg-orange-500"
      : risk === "elevated"
      ? "bg-yellow-500"
      : "bg-gray-500";

  return (
    <div className="bg-[#111622] p-4 rounded-xl border border-gray-800 shadow mb-10 overflow-x-auto whitespace-nowrap">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Timeline Navigator
      </h2>

      <div className="flex gap-2">
        {timestamps.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect && onSelect(t.id)}
            className={`w-3 h-10 rounded ${color(t.risk)} hover:opacity-75`}
            title={`${t.ts} • ${t.risk}`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Click any bar to jump to event details.
      </p>
    </div>
  );
}
