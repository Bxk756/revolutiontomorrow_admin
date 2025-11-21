import React, { useEffect, useState } from "react";

export default function BehavioralModelViewer({ eventId }) {
  const [behavior, setBehavior] = useState(null);

  async function loadBehavior() {
    if (!eventId) {
      setBehavior(null);
      return;
    }

    try {
      const res = await fetch(`/api/model_behavior?event_id=${eventId}`);
      const json = await res.json();
      setBehavior(json);
    } catch (err) {
      console.error("Behavior model error:", err);
    }
  }

  useEffect(() => {
    loadBehavior();
  }, [eventId]);

  if (!eventId)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-500">
        Select an event to view model behavior.
      </div>
    );

  if (!behavior)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading model behavior…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Behavioral Model Analysis
      </h2>

      <div className="space-y-3 text-sm text-gray-300">
        <p>
          <strong>Risk Score:</strong>{" "}
          <span className="text-blue-400">{behavior.risk_score}</span>
        </p>

        <p className="text-xs text-gray-500">Model Confidence</p>
        <p className="text-gray-300">{behavior.confidence}</p>

        <p className="text-xs text-gray-500 mt-2">Model Factors</p>
        <pre className="bg-black/20 p-3 rounded border border-gray-800 whitespace-pre-wrap text-xs text-gray-400">
{JSON.stringify(behavior.factors, null, 2)}
        </pre>
      </div>
    </div>
  );
}
