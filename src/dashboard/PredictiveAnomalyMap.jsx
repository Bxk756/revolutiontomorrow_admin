import React, { useEffect, useState } from "react";

export default function PredictiveAnomalyMap() {
  const [map, setMap] = useState([]);

  async function loadMap() {
    try {
      const res = await fetch("/api/anomaly_map");
      const json = await res.json();
      setMap(json.heatmap || []);
    } catch (err) {
      console.error("Anomaly map error:", err);
    }
  }

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Predictive Anomaly Map
      </h2>

      <table className="border-collapse text-sm text-gray-300">
        <tbody>
          {map.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => {
                const color =
                  cell < 0.2
                    ? "#1F2937"
                    : cell < 0.4
                    ? "#3B82F6"
                    : cell < 0.7
                    ? "#F59E0B"
                    : "#EF4444";
                return (
                  <td
                    key={j}
                    className="w-10 h-10 border border-gray-800 text-center"
                    style={{ backgroundColor: color }}
                  >
                    {Math.round(cell * 100)}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {map.length === 0 && (
        <p className="text-gray-500 text-sm">No anomaly predictions loaded.</p>
      )}
    </div>
  );
}
