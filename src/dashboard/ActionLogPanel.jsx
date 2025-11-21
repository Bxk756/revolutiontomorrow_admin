import React, { useEffect, useState } from "react";

export default function ActionLogPanel() {
  const [actions, setActions] = useState([]);

  async function loadActions() {
    try {
      const res = await fetch("/api/action_logs");
      const json = await res.json();
      setActions(json.logs || []);
    } catch (err) {
      console.error("Action log error:", err);
    }
  }

  useEffect(() => {
    loadActions();
    const int = setInterval(loadActions, 12000); // refresh every 12s
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-72 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Administrator Action Log
      </h2>

      {actions.map((a, i) => (
        <div
          key={i}
          className="border-b border-gray-800 py-2 text-sm text-gray-300"
        >
          <p className="text-gray-400 text-xs">{a.ts}</p>
          <p>{a.action}</p>
          <p className="text-xs text-gray-500">{a.details}</p>
        </div>
      ))}

      {actions.length === 0 && (
        <p className="text-gray-500 text-sm">No admin actions logged.</p>
      )}
    </div>
  );
}
