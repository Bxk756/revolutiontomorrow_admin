import React from "react";
import { useEvents } from "./useEvents";

export default function ActivityFeed() {
  const { events, loading, error } = useEvents();

  if (loading) return <p className="text-gray-400">Loading activity…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const recent = events.slice(0, 10);

  return (
    <div className="bg-[#111622] p-5 rounded-xl border border-gray-800 shadow">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

      <ul className="space-y-3">
        {recent.map((ev) => (
          <li
            key={ev.id}
            className="flex gap-3 items-start animate-fadeIn"
          >
            <div className="w-2 h-2 rounded-full mt-2 bg-blue-500"></div>
            <div>
              <p className="text-gray-200 text-sm">
                <span className="font-semibold">{ev.event_type}</span>{" "}
                • {ev.risk_level}
              </p>
              <p className="text-gray-500 text-xs">{ev.ts}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

