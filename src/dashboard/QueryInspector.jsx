import React, { useEffect, useState } from "react";

export default function QueryInspector() {
  const [queries, setQueries] = useState([]);

  async function loadQueries() {
    try {
      const res = await fetch("/api/query_inspector");
      const json = await res.json();
      setQueries(json.logs || []);
    } catch (err) {
      console.error("Query inspector error:", err);
    }
  }

  useEffect(() => {
    loadQueries();
    const int = setInterval(loadQueries, 8000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 shadow rounded-xl mb-10 h-80 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Query Inspector
      </h2>

      {queries.map((q, idx) => (
        <div key={idx} className="border-b border-gray-800 py-2 text-sm">
          <p className="text-xs text-gray-500">{q.timestamp}</p>
          <p className="text-gray-300">{q.operation}</p>
          <pre className="text-gray-500 text-xs whitespace-pre-wrap bg-black/30 p-2 rounded mt-1 border border-gray-800">
{JSON.stringify(q.details, null, 2)}
          </pre>
        </div>
      ))}

      {queries.length === 0 && (
        <p className="text-gray-500 text-sm">No query logs available.</p>
      )}
    </div>
  );
}
