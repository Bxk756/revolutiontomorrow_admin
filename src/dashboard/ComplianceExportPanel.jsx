import React, { useState } from "react";

export default function ComplianceExportPanel() {
  const [status, setStatus] = useState("");

  async function download(kind) {
    setStatus(`Preparing ${kind.toUpperCase()} export…`);
    try {
      const res = await fetch(`/api/compliance_export?format=${kind}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compliance_bundle.${kind}`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("Export started.");
    } catch (err) {
      console.error("Compliance export error:", err);
      setStatus("Export failed.");
    }
  }

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Compliance Export Panel
      </h2>

      <div className="flex flex-wrap gap-3 mb-3">
        <button
          onClick={() => download("json")}
          className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded"
        >
          Export JSON Bundle
        </button>
        <button
          onClick={() => download("zip")}
          className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded"
        >
          Export ZIP Archive
        </button>
        <button
          onClick={() => download("pdf")}
          className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded"
        >
          Export PDF Summary
        </button>
      </div>

      <p className="text-xs text-gray-500">{status}</p>
      <p className="text-xs text-gray-500 mt-2">
        Includes policies, audit logs, incident reports, and system posture.
      </p>
    </div>
  );
}
