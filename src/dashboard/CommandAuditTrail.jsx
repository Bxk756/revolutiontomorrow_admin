import React, { useEffect, useState } from "react";

export default function CommandAuditTrail() {
  const [logs, setLogs] = useState([]);

  async function loadLogs() {
    try {
      const res = await fetch("/api/command_audit");
      const json = await res.json();
      setLogs(json.logs || []);
    } catch (err) {
      console.error("Command audit error:", err);
    }
  }

  useEffect(() => {
    loadLogs();
    const int = setInterval(loadLogs, 10000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10 h-72 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Command Audit Trail
      </h2>

      {logs.map((log, i) => (
        <div key={i} className="border-b border-gray-800 py-2">
          <p className="text-xs text-gray-500">{log.ts}</p>
          <p className="text-gray-300">{log.command}</p>
          <p className="text-xs text-gray-500">{log.details}</p>
        </div>
      ))}

      {logs.length === 0 && (
        <p className="text-gray-600 text-sm">No command records.</p>
      )}
    </div>
  );
}
