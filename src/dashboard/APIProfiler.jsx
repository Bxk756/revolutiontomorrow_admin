import React, { useEffect, useState } from "react";

export default function APIProfiler() {
  const [endpoints, setEndpoints] = useState([]);

  async function loadProfile() {
    try {
      const res = await fetch("/api/api_profile");
      const json = await res.json();
      setEndpoints(json.endpoints || []);
    } catch (err) {
      console.error("API profiler error:", err);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        API Profiler
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2 pr-4">Endpoint</th>
              <th className="py-2 pr-4">Calls</th>
              <th className="py-2 pr-4">Avg Latency</th>
              <th className="py-2 pr-4">Error Rate</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((e, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="py-2 pr-4 text-gray-200">{e.path}</td>
                <td className="py-2 pr-4 text-gray-300">{e.calls}</td>
                <td className="py-2 pr-4 text-gray-300">
                  {e.avg_latency_ms} ms
                </td>
                <td className="py-2 pr-4 text-gray-300">
                  {Math.round((e.error_rate || 0) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {endpoints.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No API profile data.</p>
      )}
    </div>
  );
}
