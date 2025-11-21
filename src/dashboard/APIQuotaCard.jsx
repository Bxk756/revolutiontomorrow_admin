import React from "react";
import { useUsage } from "./useUsage";

export default function APIQuotaCard() {
  const { data } = useUsage();

  const latest = data?.[0] || {};
  const used = latest.total_calls || 0;
  const quota = latest.quota || 10000; // default quota
  const percent = Math.min(100, Math.round((used / quota) * 100));

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        API Quota Usage
      </h2>

      <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-gray-300 text-sm">
        {used.toLocaleString()} / {quota.toLocaleString()} calls used
      </p>

      <p className="text-gray-400 text-xs mt-1">{percent}% of monthly quota</p>
    </div>
  );
}
