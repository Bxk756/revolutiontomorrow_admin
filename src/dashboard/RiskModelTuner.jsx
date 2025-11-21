import React, { useEffect, useState } from "react";

export default function RiskModelTuner() {
  const [weights, setWeights] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadWeights() {
    try {
      const res = await fetch("/api/model_tuning");
      const json = await res.json();
      setWeights(json.weights);
    } catch (err) {
      console.error("Risk model tuner error:", err);
    }
  }

  async function save() {
    setSaving(true);
    try {
      await fetch("/api/model_tuning", {
        method: "POST",
        body: JSON.stringify({ weights }),
      });
    } catch (err) {
      console.error("Save weights error:", err);
    }
    setSaving(false);
  }

  useEffect(() => {
    loadWeights();
  }, []);

  if (!weights)
    return (
      <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 text-gray-400">
        Loading model weights…
      </div>
    );

  const sliders = Object.keys(weights);

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Risk Model Tuner
      </h2>

      <div className="space-y-4">
        {sliders.map((key) => (
          <div key={key}>
            <p className="text-sm text-gray-300">{key}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={weights[key]}
              onChange={(e) =>
                setWeights({ ...weights, [key]: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <p className="text-xs text-gray-500">{weights[key]}</p>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        {saving ? "Saving…" : "Save Weights"}
      </button>
    </div>
  );
}
