import React, { useEffect, useState } from "react";

export default function IntelligenceSummary() {
  const [text, setText] = useState("Loading intelligence…");

  async function loadIntel() {
    try {
      const res = await fetch("/api/intel_summary");
      const json = await res.json();
      setText(json.summary || "No summary available.");
    } catch (err) {
      console.error("Intel summary error:", err);
      setText("Unable to load intelligence summary.");
    }
  }

  useEffect(() => {
    loadIntel();
    const intv = setInterval(loadIntel, 20000);
    return () => clearInterval(intv);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Intelligence Summary
      </h2>

      <p className="text-gray-300 text-sm leading-6 whitespace-pre-wrap">
        {text}
      </p>

      <p className="text-xs text-gray-500 mt-3">
        Updated every ~20 seconds.
      </p>
    </div>
  );
}
