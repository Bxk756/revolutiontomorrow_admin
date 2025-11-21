import React, { useEffect, useState } from "react";

export default function EventReplay({ eventId }) {
  const [steps, setSteps] = useState([]);

  async function loadReplay() {
    if (!eventId) {
      setSteps([]);
      return;
    }

    try {
      const res = await fetch(`/api/event_replay?event_id=${eventId}`);
      const json = await res.json();
      setSteps(json.steps || []);
    } catch (err) {
      console.error("Replay error:", err);
    }
  }

  useEffect(() => {
    loadReplay();
  }, [eventId]);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-80 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">Event Replay</h2>

      {!eventId && (
        <p className="text-gray-500 text-sm">
          Select an event to view replay.
        </p>
      )}

      {steps.map((s, i) => (
        <div key={i} className="mb-4">
          <p className="text-xs text-gray-500">{s.ts}</p>
          <p className="font-semibold text-gray-200">{s.step}</p>
          <p className="text-sm text-gray-400 whitespace-pre-wrap">
            {s.details}
          </p>
        </div>
      ))}

      {steps.length === 0 && eventId && (
        <p className="text-gray-600 text-sm">No replay data for this event.</p>
      )}
    </div>
  );
}
