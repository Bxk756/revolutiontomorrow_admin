import React, { useEffect, useState } from "react";

export default function ThreatCorrelationGraph() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  async function loadGraph() {
    try {
      const res = await fetch("/api/correlation");
      const json = await res.json();
      setNodes(json.nodes || []);
      setLinks(json.links || []);
    } catch (err) {
      console.error("Correlation graph error:", err);
    }
  }

  useEffect(() => {
    loadGraph();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Threat Correlation Graph
      </h2>

      <p className="text-gray-400 text-sm mb-3">
        Visualizes relationships between events, IPs, and users.
      </p>

      {/* Graph Placeholder */}
      <div className="w-full h-80 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-gray-500 text-sm">
          (Graph rendering placeholder — integrate D3.js or vis-network later)
        </p>
      </div>

      {/* Raw summary */}
      <p className="text-gray-500 text-xs mt-3">
        Nodes: {nodes.length} • Links: {links.length}
      </p>
    </div>
  );
}
