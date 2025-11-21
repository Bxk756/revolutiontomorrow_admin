import React, { useEffect, useState } from "react";

export default function SecurityScoreIndex() {
  const [score, setScore] = useState(null);

  async function loadScore() {
    try {
      const res = await fetch("/api/security_score");
      const json = await res.json();
      setScore(json);
    } catch (err) {
      console.error("Security score error:", err);
    }
  }

  useEffect(() => {
    loadScore();
  }, []);

  if (!score) {
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading security index…
      </div>
    );
  }

  const overall = Math.round(score.overall || 0);

  const color =
    overall < 40 ? "text-red-500"
    : overall < 70 ? "text-yellow-400"
    : "text-green-400";

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-2">
        Security Score Index
      </h2>

      <p className={`text-4xl font-bold ${color}`}>{overall}</p>
      <p className="text-xs text-gray-500 mt-1">Overall security posture (0–100)</p>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-300">
        <div>
          <p className="text-gray-400 text-xs">Detection</p>
          <p>{score.detection}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Response</p>
          <p>{score.response}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Hardening</p>
          <p>{score.hardening}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Compliance</p>
          <p>{score.compliance}</p>
        </div>
      </div>
    </div>
  );
}
