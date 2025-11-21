import React, { useEffect, useState } from "react";

export default function EventFingerprintGraph({ eventId }) {
  const [graph, setGraph] = useState(null);

  async function loadGraph() {
    if (!eventId) {
      setGraph(null);
      return;
    }

    try {
      const res = await fetch(`/api/fingerprint_graph?event_id=${eventId}`);
      const json = await res.json();
      setGraph(json);
    } catch (err) {
      console.error("Fingerprint graph error:", err);
    }
  }

  useEffect(() => {
    loadGraph();
  }, [eventId]);

  if (!eventId)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-500">
        Select an event to view fingerprint mapping.
      </div>
    );

  if (!graph)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading fingerprint analysis…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Event Fingerprint Graph
      </h2>

      <p className="text-gray-400 text-sm mb-4">
        Similarity clusters based on embeddings + metadata.
      </p>

      {/* Graph placeholder */}
      <div className="w-full h-64 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          (Graph rendering placeholder — drop in D3/vis.js later)
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Nodes: {graph.nodes?.length || 0} — Links: {graph.links?.length || 0}
      </p>
    </div>
  );
}
