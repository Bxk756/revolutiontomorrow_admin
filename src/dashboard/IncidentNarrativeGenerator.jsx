import React, { useState } from "react";

export default function IncidentNarrativeGenerator() {
  const [eventId, setEventId] = useState("");
  const [text, setText] = useState("");

  async function generate() {
    if (!eventId) return;

    setText("Generating narrative…");

    try {
      const res = await fetch(`/api/generate_narrative?event_id=${eventId}`);
      const json = await res.json();
      setText(json.narrative || "No narrative generated.");
    } catch (err) {
      console.error("Narrative generator error:", err);
      setText("Error generating narrative.");
    }
  }

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Incident Narrative Generator
      </h2>

      <input
        className="w-full bg-gray-800 text-gray-200 px-3 py-2 rounded text-sm mb-3"
        placeholder="Event ID (e.g., 9834-xy22)"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />

      <button
        onClick={generate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Generate Narrative
      </button>

      <pre className="bg-black/20 p-4 mt-4 rounded border border-gray-800 text-xs text-gray-300 whitespace-pre-wrap h-48 overflow-y-auto">
{text}
      </pre>
    </div>
  );
}
