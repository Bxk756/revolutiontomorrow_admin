import React, { useEffect, useState } from "react";

export default function SystemTopologyMap() {
  const [map, setMap] = useState(null);

  async function loadMap() {
    try {
      const res = await fetch("/api/system_topology");
      const json = await res.json();
      setMap(json);
    } catch (err) {
      console.error("Topology error:", err);
    }
  }

  useEffect(() => {
    loadMap();
  }, []);

  if (!map)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading system topology…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        System Topology Map
      </h2>

      <div className="w-full h-64 bg-gray-900 border border-gray-800 rounded flex items-center justify-center">
        <p className="text-gray-500 text-sm">(Topology graph placeholder)</p>
      </div>

      <pre className="bg-black/30 p-4 mt-4 text-xs text-gray-300 rounded border border-gray-800 whitespace-pre-wrap">
{JSON.stringify(map, null, 2)}
      </pre>
    </div>
  );
}
