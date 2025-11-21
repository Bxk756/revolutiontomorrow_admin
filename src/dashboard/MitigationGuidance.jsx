import React, { useEffect, useState } from "react";

export default function MitigationGuidance({ eventId }) {
  const [text, setText] = useState("Loading mitigation steps…");

  async function loadGuidance() {
    if (!eventId) {
      setText("Select an event to view mitigation guidance.");
      return;
    }

    try {
      const res = await fetch(`/api/mitigation?event_id=${eventId}`);
      const json = await res.json();
      setText(json.guidance || "No mitigation guidance available.");
    } catch (err) {
      console.error("Mitigation guidance error:", err);
      setText("Unable to load guidance.");
    }
  }

  useEffect(() => {
    loadGuidance();
  }, [eventId]);

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Mitigation Guidance
      </h2>

      <p className="text-gray-300 whitespace-pre-wrap text-sm leading-6">
        {text}
      </p>

      <p className="text-xs text-gray-500 mt-3">
        AI-assisted threat response.
      </p>
    </div>
  );
}
