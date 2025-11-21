import React from "react";

export default function ThreatScoreGauge({ score = 0 }) {
  const clamped = Math.max(0, Math.min(100, score));
  const rotation = (clamped / 100) * 180;

  const color =
    clamped < 30 ? "text-green-400"
    : clamped < 60 ? "text-yellow-400"
    : clamped < 85 ? "text-orange-400"
    : "text-red-500";

  const bar =
    clamped < 30 ? "border-green-400"
    : clamped < 60 ? "border-yellow-400"
    : clamped < 85 ? "border-orange-400"
    : "border-red-500";

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow text-center mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-2">Threat Score</h2>

      {/* Half Radial Gauge */}
      <div className="relative w-40 h-20 mx-auto overflow-hidden">
        <div
          className={`absolute left-0 top-0 w-40 h-40 rounded-full border-8 ${bar} border-b-transparent`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "0.4s ease",
          }}
        />
      </div>

      <p className={`text-4xl font-bold mt-2 ${color}`}>
        {clamped}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Model-generated risk score
      </p>
    </div>
  );
}
