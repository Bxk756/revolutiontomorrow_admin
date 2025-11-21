import React, { useEffect, useState } from "react";

export default function AuditLogTable() {
  const [logs, setLogs] = useState([]);

  async function loadLogs() {
    try {
      const res = await fetch("/api/audit_logs");
      const json = await res.json();
      setLogs(json);
    } catch (err) {
      console.error("Audit logs error:", err);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Admin Audit Logs
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Time</th>
              <th className="py-2">Action</th>
              <th className="py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-800">
                <td className="py-2 text-gray-300">{log.ts}</td>
                <td className="py-2 text-gray-200">{log.action}</td>
                <td className="py-2 text-gray-500">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logs.length === 0 && (
        <p className="text-gray-500 text-xs mt-3">No audit logs yet.</p>
      )}
    </div>
  );
}
