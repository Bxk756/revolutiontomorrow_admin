// src/dashboard/AISOCReportPanel.jsx
import React, { useState } from "react";
import { askAIReport } from "../utils/ai.js";

export default function AISOCReportPanel() {
  const [raw, setRaw] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    const result = await askAIReport(raw);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="panel p-6 space-y-4">
      <h2 className="text-lg font-semibold">AI SOC Report Generator</h2>
      <p className="text-xs text-slate-400">
        Paste raw logs, events, or incident notes. The local Phi model will produce a structured SOC report.
      </p>

      <textarea
        className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm"
        placeholder="Paste SIEM export, event list, or raw logs here…"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
      />

      <button
        onClick={generateReport}
        disabled={loading || !raw.trim()}
        className="px-4 py-2 bg-blue-600 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating report…" : "Generate SOC Report"}
      </button>

      <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm whitespace-pre-wrap max-h-80 overflow-auto">
        {report ? (
          report
        ) : (
          <span className="text-slate-600 text-xs">
            The structured SOC report will appear here…
          </span>
        )}
      </div>
    </div>
  );
}
