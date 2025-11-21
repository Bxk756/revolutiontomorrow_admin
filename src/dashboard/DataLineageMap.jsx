import React, { useEffect, useState } from "react";

export default function DataLineageMap() {
  const [lineage, setLineage] = useState(null);

  async function loadLineage() {
    try {
      const res = await fetch("/api/data_lineage");
      const json = await res.json();
      setLineage(json);
    } catch (err) {
      console.error("Data lineage error:", err);
    }
  }

  useEffect(() => {
    loadLineage();
  }, []);

  if (!lineage) {
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400 mb-10">
        Loading data lineage…
      </div>
    );
  }

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Data Lineage Map
      </h2>

      <div className="w-full h-64 bg-gray-900 rounded border border-gray-800 flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          (Lineage graph placeholder — nodes & edges below)
        </p>
      </div>

      <pre className="bg-black/30 p-4 mt-4 text-xs text-gray-300 rounded border border-gray-800 whitespace-pre-wrap">
{JSON.stringify(lineage, null, 2)}
      </pre>
    </div>
  );
}
