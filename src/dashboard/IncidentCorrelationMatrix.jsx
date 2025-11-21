import React, { useEffect, useState } from "react";

export default function IncidentCorrelationMatrix() {
  const [matrix, setMatrix] = useState([]);

  async function loadMatrix() {
    try {
      const res = await fetch("/api/correlation_matrix");
      const json = await res.json();
      setMatrix(json.matrix || []);
    } catch (err) {
      console.error("Correlation matrix error:", err);
    }
  }

  useEffect(() => {
    loadMatrix();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Incident Correlation Matrix
      </h2>

      <table className="border-collapse text-sm text-gray-300">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="w-10 h-10 border border-gray-800 text-center"
                  style={{
                    backgroundColor:
                      cell === 0
                        ? "#1F2937"
                        : cell === 1
                        ? "#3B82F6"
                        : cell === 2
                        ? "#F59E0B"
                        : cell === 3
                        ? "#EF4444"
                        : "#6B7280",
                  }}
                >
                  {cell > 0 ? cell : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {matrix.length === 0 && (
        <p className="text-gray-500 text-sm">No correlations available.</p>
      )}
    </div>
  );
}
