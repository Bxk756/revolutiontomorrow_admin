import React, { useState } from "react";

export default function TopbarFilters() {
  const [range, setRange] = useState("30d");
  const [risk, setRisk] = useState("all");

  return (
    <div className="bg-[#111622] p-4 rounded-xl border border-gray-800 shadow mb-8 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">Range:</span>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-gray-900 border border-gray-700 px-2 py-1 rounded text-sm"
        >
          <option value="1d">Today</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">Risk:</span>
        <select
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="bg-gray-900 border border-gray-700 px-2 py-1 rounded text-sm"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="elevated">Elevated</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="text-gray-500 text-xs ml-auto">
        Filters UI only — API filtering coming soon
      </div>
    </div>
  );
}
