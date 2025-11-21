import React, { useEffect, useState } from "react";

export default function APILatencyHeatmap() {
  const [heat, setHeat] = useState([]);

  async function loadHeat() {
    try {
      const res = await fetch("/api/latency_map");
      const json = await res.json();
      setHeat(json.rows || []);
    } catch (err) {
      console.error("Latency heatmap load error:", err);
    }
  }

  useEffect(() => {
    loadHeat();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        API Latency Heatmap
      </h2>

      <table className="border-collapse text-sm text-gray-300">
        <tbody>
          {heat.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="w-12 h-12 border border-gray-800 text-center"
                  style={{
                    backgroundColor:
                      cell < 100
                        ? "#10B981"
                        : cell < 300
                        ? "#F59E0B"
                        : "#EF4444",
                  }}
                >
                  {cell}ms
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {heat.length === 0 && (
        <p className="text-gray-600 text-sm mt-2">
          No latency data available.
        </p>
      )}
    </div>
  );
}
