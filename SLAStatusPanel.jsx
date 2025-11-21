import React, { useEffect, useState } from "react";

export default function SLAStatusPanel() {
  const [slas, setSlas] = useState([]);

  async function loadSLAs() {
    try {
      const res = await fetch("/api/sla_status");
      const json = await res.json();
      setSlas(json.slas || []);
    } catch (err) {
      console.error("SLA status error:", err);
    }
  }

  useEffect(() => {
    loadSLAs();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        SLA Status
      </h2>

      <div className="space-y-3 text-sm">
        {slas.map((s, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-700 p-4 rounded"
          >
            <p className="font-semibold text-gray-200">{s.name}</p>
            <p className="text-xs text-gray-500">Target: {s.target}</p>
            <p className="text-xs text-gray-500">Actual: {s.actual}</p>

            <p
              className={`mt-1 text-xs ${
                s.status === "met"
                  ? "text-green-400"
                  : s.status === "at-risk"
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}
            >
              Status: {s.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>

      {slas.length === 0 && (
        <p className="text-gray-500 text-sm">No SLA data available.</p>
      )}
    </div>
  );
}
