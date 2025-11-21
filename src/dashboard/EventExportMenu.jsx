import React from "react";

export default function EventExportMenu() {
  async function download(type) {
    const res = await fetch(`/api/events_export?format=${type}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `events.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => download("json")}
        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs rounded"
      >
        Export JSON
      </button>

      <button
        onClick={() => download("csv")}
        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs rounded"
      >
        Export CSV
      </button>

      <button
        onClick={() => download("pdf")}
        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs rounded"
      >
        Export PDF
      </button>
    </div>
  );
}
