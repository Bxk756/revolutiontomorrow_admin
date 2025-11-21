import React, { useEffect, useState } from "react";

export default function SystemEventFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    let socket;

    try {
      socket = new WebSocket("wss://your-worker-domain/api/events/stream");

      socket.onmessage = (msg) => {
        const evt = JSON.parse(msg.data);
        setFeed((prev) => [evt, ...prev.slice(0, 49)]); // keep last 50
      };

      socket.onerror = () => console.log("WebSocket error");
    } catch {
      console.log("WebSocket unavailable.");
    }

    return () => socket && socket.close();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-72 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Real-Time Event Feed
      </h2>

      {feed.map((f, i) => (
        <div
          key={i}
          className="border-b border-gray-800 py-2 text-sm text-gray-300"
        >
          <span className="text-gray-500 text-xs">{f.ts}</span>
          <br />
          <span className="text-blue-400">{f.event_type}</span>
          <span className="text-gray-400"> — {f.input_snip}</span>
        </div>
      ))}

      {feed.length === 0 && (
        <p className="text-gray-500 text-sm">Waiting for events…</p>
      )}
    </div>
  );
}
