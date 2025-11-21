import React, { useEffect, useState } from "react";

export default function EndpointHealthBoard() {
  const [endpoints, setEndpoints] = useState([]);

  async function loadEndpoints() {
    try {
      const res = await fetch("/api/endpoints");
      const json = await res.json();
      setEndpoints(json.endpoints || []);
    } catch (err) {
      console.error("Endpoint health error:", err);
    }
  }

  useEffect(() => {
    loadEndpoints();
    const int = setInterval(loadEndpoints, 15000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Endpoint Health Board
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {endpoints.map((e, idx) => (
          <div
            key={idx}
            className="bg-gray-900 p-4 rounded-lg border border-gray-700"
          >
            <p className="font-semibold text-gray-200">{e.name}</p>
            
            <p className="text-sm text-gray-300 mt-1">
              Status:{" "}
              <span
                className={
                  e.status === "healthy"
                    ? "text-green-400"
                    : e.status === "warning"
                    ? "text-yellow-400"
                    : "text-red-500"
                }
              >
                {e.status.toUpperCase()}
              </span>
            </p>

            <p className="text-xs text-gray-500">Agent v{e.version}</p>
            <p className="text-xs text-gray-500">CPU: {e.cpu}%</p>
            <p className="text-xs text-gray-500">Memory: {e.memory}%</p>
            <p className="text-xs text-gray-500">Last Check-In: {e.last_seen}</p>
          </div>
        ))}
      </div>

      {endpoints.length === 0 && (
        <p className="text-gray-500 text-sm">No endpoints detected.</p>
      )}
    </div>
  );
}
