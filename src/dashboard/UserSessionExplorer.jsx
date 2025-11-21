import React, { useEffect, useState } from "react";

export default function UserSessionExplorer() {
  const [sessions, setSessions] = useState([]);

  async function loadSessions() {
    try {
      const res = await fetch("/api/session_history");
      const json = await res.json();
      setSessions(json.sessions || []);
    } catch (err) {
      console.error("Session history error:", err);
    }
  }

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-80 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        User Session Explorer
      </h2>

      {sessions.map((s, i) => (
        <div
          key={i}
          className="border-b border-gray-800 py-2 text-sm text-gray-300"
        >
          <p className="font-semibold text-gray-100">{s.user}</p>
          <p className="text-xs text-gray-500">
            {s.ip} • {s.agent}
          </p>
          <p className="text-xs text-gray-500">
            {s.start} → {s.end} ({s.duration})
          </p>
        </div>
      ))}

      {sessions.length === 0 && (
        <p className="text-gray-500 text-sm">No session history.</p>
      )}
    </div>
  );
}
