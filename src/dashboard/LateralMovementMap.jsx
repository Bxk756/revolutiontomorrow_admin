import React, { useEffect, useState } from "react";

export default function LateralMovementMap({ eventId }) {
  const [paths, setPaths] = useState(null);

  async function loadPaths() {
    if (!eventId) {
      setPaths(null);
      return;
    }

    try {
      const res = await fetch(`/api/lateral_movement?event_id=${eventId}`);
      const json = await res.json();
      setPaths(json);
    } catch (err) {
      console.error("Lateral movement error:", err);
    }
  }

  useEffect(() => {
    loadPaths();
  }, [eventId]);

  if (!eventId)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-500">
        Select an event to view lateral movement mapping.
      </div>
    );

  if (!paths)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading attack path analysis…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Lateral Movement Map
      </h2>

      <p className="text-gray-400 text-sm mb-4">
        Attack path simulation based on event indicators.
      </p>

      <div className="w-full h-64 flex items-center justify-center bg-gray-900 rounded border border-gray-800">
        <p className="text-gray-500 text-sm">(Graph visualization placeholder)</p>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Nodes: {paths.nodes?.length || 0} — Edges: {paths.edges?.length || 0}
      </p>
    </div>
  );
}
