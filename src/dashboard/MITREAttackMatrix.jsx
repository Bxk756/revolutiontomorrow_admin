import React, { useEffect, useState } from "react";

export default function MITREAttackMatrix() {
  const [matrix, setMatrix] = useState([]);

  async function loadMatrix() {
    try {
      const res = await fetch("/api/mitre_matrix");
      const json = await res.json();
      setMatrix(json.matrix || []);
    } catch (err) {
      console.error("MITRE matrix error:", err);
    }
  }

  useEffect(() => {
    loadMatrix();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        MITRE ATT&CK Matrix
      </h2>

      <table className="border-collapse text-sm">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="w-40 h-20 border border-gray-800 p-2 text-gray-200 align-top"
                  style={{
                    backgroundColor:
                      cell.detections > 0
                        ? "rgba(239,68,68,0.4)" // red
                        : "rgba(31,41,55,1)", // gray
                  }}
                >
                  <p className="font-semibold text-sm">{cell.technique}</p>
                  <p className="text-xs text-gray-300">Detections: {cell.detections}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {matrix.length === 0 && (
        <p className="text-gray-500 text-sm">No ATT&CK data detected.</p>
      )}
    </div>
  );
}
