import React, { useState } from "react";

export default function PDFExportCenter() {
  const [status, setStatus] = useState("");

  async function exportPDF(kind) {
    setStatus(`Generating ${kind} PDF…`);
    try {
      const res = await fetch(`/api/export_pdf?type=${kind}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${kind}_report.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("Download started.");
    } catch (err) {
      console.error("PDF export error:", err);
      setStatus("Failed to generate PDF.");
    }
  }

  const buttons = [
    { type: "daily_risk", label: "Daily Risk Report" },
    { type: "weekly_overview", label: "Weekly Overview" },
    { type: "compliance", label: "Compliance Summary" },
  ];

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        PDF Export Center
      </h2>

      <div className="flex flex-wrap gap-3 mb-3">
        {buttons.map((b) => (
          <button
            key={b.type}
            onClick={() => exportPDF(b.type)}
            className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded"
          >
            {b.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500">{status}</p>
    </div>
  );
}
