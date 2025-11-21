import React, { useEffect, useState } from "react";

export default function AutomatedHuntEngine() {
  const [hunts, setHunts] = useState([]);

  async function loadHunts() {
    try {
      const res = await fetch("/api/hunt");
      const json = await res.json();
      setHunts(json.findings || []);
    } catch (err) {
      console.error("Hunt engine error:", err);
    }
  }

  useEffect(() => {
    loadHunts();
    const int = setInterval(loadHunts, 20000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Automated Threat Hunt Engine
      </h2>

      <div className="space-y-4">
        {hunts.map((h, idx) => (
          <div
            key={idx}
            className="bg-gray-900 border border-gray-700 p-4 rounded text-sm text-gray-300"
          >
            <p className="font-semibold">{h.title}</p>
            <p className="text-xs text-gray-500">{h.timestamp}</p>

            <p className="mt-1">{h.description}</p>

            <p className="text-xs mt-2 text-blue-400">
              Severity: {h.severity}
            </p>
          </div>
        ))}
      </div>

      {hunts.length === 0 && (
        <p className="text-gray-600 text-sm">
          No hunt findings detected.
        </p>
      )}
    </div>
  );
}
