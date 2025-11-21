import React, { useEffect, useState } from "react";

export default function SessionTracker() {
  const [sessions, setSessions] = useState([]);

  async function loadSessions() {
    try {
      const res = await fetch("/api/sessions");
      const json = await res.json();
      setSessions(json.sessions || []);
    } catch (err) {
      console.error("Session tracker error:", err);
    }
  }

  useEffect(() => {
    loadSessions();
    const int = setInterval(loadSessions, 10000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Active User Sessions
      </h2>

      <div className="space-y-3">
        {sessions.map((s, i) => (
          <div
            key={i}
            className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm text-gray-300"
          >
            <p><strong>User:</strong> {s.user || "Unknown"}</p>
            <p><strong>IP:</strong> {s.ip}</p>
            <p><strong>Agent:</strong> <span className="text-xs text-gray-500">{s.agent}</span></p>
            <p><strong>Last Active:</strong> {s.last_active}</p>
            <p><strong>Duration:</strong> {s.duration}</p>
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No active sessions.</p>
      )}
    </div>
  );
}
