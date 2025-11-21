import React, { useEffect, useState } from "react";

export default function EventClusterMap() {
  const [clusters, setClusters] = useState([]);

  async function loadClusters() {
    try {
      const res = await fetch("/api/clusters");
      const json = await res.json();
      setClusters(json.clusters || []);
    } catch (err) {
      console.error("Cluster map load error:", err);
    }
  }

  useEffect(() => {
    loadClusters();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Event Cluster Map
      </h2>

      <p className="text-gray-400 mb-4 text-sm">
        Visual grouping of similar events, based on embeddings or metadata.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {clusters.map((c, i) => (
          <div
            key={i}
            className="bg-black/20 border border-gray-700 p-4 rounded-lg"
          >
            <p className="text-gray-200 font-semibold mb-2">
              Cluster #{i + 1}
            </p>

            <p className="text-gray-400 text-xs mb-2">
              {c.label || "Unlabeled cluster"}
            </p>

            <p className="text-gray-500 text-xs">
              {c.events?.length || 0} events
            </p>
          </div>
        ))}
      </div>

      {clusters.length === 0 && (
        <p className="text-gray-600 text-xs mt-3">
          No clusters available yet.
        </p>
      )}
    </div>
  );
}
