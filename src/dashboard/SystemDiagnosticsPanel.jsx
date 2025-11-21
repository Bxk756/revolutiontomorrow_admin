import React, { useEffect, useState } from "react";

export default function SystemDiagnosticsPanel() {
  const [diag, setDiag] = useState(null);

  async function loadDiagnostics() {
    try {
      const res = await fetch("/api/diagnostics");
      const json = await res.json();
      setDiag(json);
    } catch (err) {
      console.error("Diagnostics load error:", err);
    }
  }

  useEffect(() => {
    loadDiagnostics();
    const int = setInterval(loadDiagnostics, 15000);
    return () => clearInterval(int);
  }, []);

  if (!diag)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading system diagnostics…
      </div>
    );

  const item = (label, value) => (
    <div className="flex justify-between text-sm py-1">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-200">{value}</span>
    </div>
  );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        System Diagnostics
      </h2>

      {item("Worker Uptime", diag.worker_uptime)}
      {item("Database Status", diag.database)}
      {item("KV Status", diag.kv)}
      {item("R2 Storage", diag.storage)}
      {item("API Health", diag.api)}
      {item("Deployment Version", diag.version)}

      <p className="text-xs text-gray-500 mt-3">
        Auto-refresh every 15s.
      </p>
    </div>
  );
}
