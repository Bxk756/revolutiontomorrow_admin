import React from "react";
import EventTags from "./EventTags";
import InputHighlighter from "./InputHighlighter";

export default function EventPanel({ event }) {
  if (!event) return <p className="text-gray-400">No event selected.</p>;

  return (
    <div className="space-y-4">

      {/* Event Type + Risk */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-200">
          {event.event_type}
        </h2>

        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            {
              low: "bg-gray-700 text-gray-200",
              elevated: "bg-yellow-600 text-black",
              high: "bg-orange-500 text-black",
              critical: "bg-red-600 text-white",
            }[event.risk_level]
          }`}
        >
          {event.risk_level}
        </span>
      </div>

      {/* Tags */}
      <EventTags event={event} />

      {/* Timestamp & IP */}
      <div className="text-sm text-gray-400">
        <p>Timestamp: <span className="text-gray-200">{event.ts}</span></p>
        <p>Source IP: <span className="text-gray-200">{event.ip || "N/A"}</span></p>
      </div>

      {/* Highlighted Input */}
      <div className="bg-black/30 p-3 rounded border border-gray-800">
        <p className="text-xs text-gray-500 mb-1">Input Text:</p>
        <InputHighlighter text={event.input_snip} />
      </div>

      {/* Full JSON */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Raw JSON:</p>
        <pre className="bg-black/40 p-3 text-xs text-gray-300 rounded border border-gray-800 whitespace-pre-wrap">
{JSON.stringify(event, null, 2)}
        </pre>
      </div>
    </div>
  );
}
