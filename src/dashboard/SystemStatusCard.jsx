import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SystemStatusCard() {
  const [status, setStatus] = useState(null);

  async function checkStatus() {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("System status error:", err);
      setStatus({ ok: false, error: true });
    }
  }

  useEffect(() => {
    checkStatus();
    const int = setInterval(checkStatus, 15000); // refresh every 15s
    return () => clearInterval(int);
  }, []);

  if (!status) {
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  const badge = status.ok ? "bg-green-600" : "bg-red-600";

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        System Status
      </h2>

      <div className="flex items-center gap-3 mb-3">
        <span className={`w-3 h-3 rounded-full ${badge}`} />
        <p className="text-gray-300 text-sm">
          {status.ok ? "All systems operational" : "System Error"}
        </p>
      </div>

      <p className="text-gray-400 text-sm">
        Uptime:{" "}
        <span className="text-gray-200 font-semibold">
          {status.uptime || "unknown"}
        </span>
      </p>

      <p className="text-gray-400 text-sm mt-1">
        Last heartbeat:{" "}
        <span className="text-gray-200 font-semibold">
          {status.heartbeat || "—"}
        </span>
      </p>
    </div>
  );
}
