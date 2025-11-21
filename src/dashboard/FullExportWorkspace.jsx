import React, { useState } from "react";

export default function FullExportWorkspace() {
  const [status, setStatus] = useState("");

  async function download(type) {
    setStatus(`Generating ${type.toUpperCase()}…`);

    try {
      const res = await fetch(`/api/export_all?format=${type}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `full_export.${type}`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("Export started.");
    } catch (err) {
      console.error("Full export error:", err);
      setStatus("Export failed.");
    }
  }

  const buttons = [
    { type: "json", label: "Export JSON" },
    { type: "csv", label: "Export CSV" },
    { type: "pdf", label: "Export PDF" },
    { type: "zip", label: "Export ZIP Bundle" },
  ];

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Full Export Workspace
      </h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {buttons.map((b) => (
          <button
            key={b.type}
            onClick={() => download(b.type)}
            className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded"
          >
            {b.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500">{status}</p>
      <p className="text-xs text-gray-500 mt-2">
        Includes system configs, risk logs, incident records, metrics, policy data, 
        audit trails, and operational snapshots.
      </p>
    </div>
  );
}
