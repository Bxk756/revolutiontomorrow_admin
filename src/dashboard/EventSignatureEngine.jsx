import React, { useEffect, useState } from "react";

export default function EventSignatureEngine({ eventId }) {
  const [matches, setMatches] = useState([]);

  async function loadSignatures() {
    if (!eventId) {
      setMatches([]);
      return;
    }

    try {
      const res = await fetch(`/api/signatures?event_id=${eventId}`);
      const json = await res.json();
      setMatches(json.matches || []);
    } catch (err) {
      console.error("Signature engine error:", err);
    }
  }

  useEffect(() => {
    loadSignatures();
  }, [eventId]);

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Signature Detection Engine
      </h2>

      {matches.length === 0 && eventId && (
        <p className="text-gray-500 text-sm">
          No signatures matched.
        </p>
      )}

      {!eventId && (
        <p className="text-gray-500 text-sm">
          Select an event to view signature matches.
        </p>
      )}

      <ul className="space-y-3">
        {matches.map((m, i) => (
          <li
            key={i}
            className="bg-gray-900 p-4 rounded border border-gray-700 text-sm text-gray-300"
          >
            <p className="font-semibold">{m.signature}</p>
            <p className="text-xs text-gray-500">{m.description}</p>
            <p className="text-xs mt-1 text-blue-400">
              Rule ID: {m.rule_id}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
