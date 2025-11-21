import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RealtimeEventsStream() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      console.error("Realtime stream error:", err);
    }
  }

  useEffect(() => {
    fetchEvents();
    const int = setInterval(fetchEvents, 5000); // 5-second live refresh
    return () => clearInterval(int);
  }, []);

  if (loading) return <LoadingSpinner size={38} />;

  return (
    <div className="bg-[#111622] p-5 rounded-xl border border-gray-800 shadow">
      <h2 className="text-lg font-semibold mb-3">Live Activity Stream</h2>

      <ul className="space-y-3 max-h-80 overflow-y-auto">
        {events.slice(0, 12).map((ev) => (
          <li key={ev.id} className="flex gap-3 items-start animate-fadeIn">
            <div className="w-2 h-2 rounded-full mt-2 bg-blue-500" />
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
