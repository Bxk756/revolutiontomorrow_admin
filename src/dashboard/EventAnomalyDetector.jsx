import React, { useMemo } from "react";
import { useEvents } from "./useEvents";

export default function EventAnomalyDetector() {
  const { events } = useEvents();

  const score = useMemo(() => {
    if (events.length < 5) return 0;

    const recent = events.slice(0, 10);
    const criticals = recent.filter((e) => e.risk_level === "critical").length;
    const highs = recent.filter((e) => e.risk_level === "high").length;

    const unusualTypes = new Set();
    recent.forEach((e) => {
      if (e.event_type.includes("unknown") || e.event_type.includes("invalid")) {
        unusualTypes.add(e.event_type);
      }
    });

    let value = 0;
    value += criticals * 0.4;
    value += highs * 0.2;
    value += unusualTypes.size * 0.3;

    return Math.min(1, value);
  }, [events]);

  const percent = Math.round(score * 100);

  const color =
    percent < 30 ? "text-green-400"
    : percent < 60 ? "text-yellow-400"
    : percent < 85 ? "text-orange-400"
    : "text-red-500";

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-2">
        Event Anomaly Detector
      </h2>

      <p className={`text-4xl font-bold ${color}`}>{percent}%</p>

      <p className="text-gray-400 text-sm mt-2">
        Probability of abnormal behavior
      </p>
    </div>
  );
}
