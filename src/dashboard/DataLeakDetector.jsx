import React, { useState } from "react";

export default function DataLeakDetector() {
  const [text, setText] = useState("");
  const [results, setResults] = useState(null);

  async function scan() {
    try {
      const res = await fetch("/api/dlp_scan", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      setResults(json);
    } catch (err) {
      console.error("DLP scan error:", err);
    }
  }

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Data Leak Prevention (DLP) Scanner
      </h2>

      <textarea
        className="w-full h-24 bg-gray-900 border border-gray-700 text-gray-300 rounded p-3 text-sm"
        placeholder="Paste text to scan for sensitive data…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={scan}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded"
      >
        Scan for Leaks
      </button>

      {results && (
        <div className="mt-4 bg-black/30 p-4 border border-gray-800 rounded text-sm text-gray-300">
          <p className="font-semibold text-gray-200 mb-2">Scan Results:</p>
          <pre className="whitespace-pre-wrap text-xs text-gray-400">
{JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
