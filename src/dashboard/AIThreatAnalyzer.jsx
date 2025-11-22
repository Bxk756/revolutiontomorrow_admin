import React, { useState } from "react";
import { askAI } from "../utils/ai.js";

export default function AIThreatAnalyzer() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    const result = await askAI(
      `Analyze this security event and provide summary, severity, confidence, and recommended actions:\n\n${input}`
    );
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="panel p-6 space-y-4">
      <h2 className="text-lg font-semibold">AI Threat Analyzer</h2>

      <textarea
        className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm"
        placeholder="Paste logs, events, or anomalies…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={analyze}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Run AI Analysis"}
      </button>

      {analysis && (
        <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-xl text-sm whitespace-pre-wrap">
          {analysis}
        </div>
      )}
    </div>
  );
}
