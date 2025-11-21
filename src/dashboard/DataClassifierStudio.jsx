import React, { useState } from "react";

export default function DataClassifierStudio() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  async function classify() {
    if (!text.trim()) return;

    setResult("Classifying…");

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error("Classifier error:", err);
      setResult("Error classifying text.");
    }
  }

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Data Classifier Studio
      </h2>

      <textarea
        className="w-full h-32 bg-gray-900 border border-gray-700 text-gray-200 p-3 rounded text-sm"
        placeholder="Enter text to classify…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={classify}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Run Classification
      </button>

      <pre className="bg-black/20 p-4 mt-4 rounded border border-gray-800 text-xs text-gray-300 whitespace-pre-wrap h-56 overflow-y-auto">
{result ? JSON.stringify(result, null, 2) : "No classification yet."}
      </pre>
    </div>
  );
}
