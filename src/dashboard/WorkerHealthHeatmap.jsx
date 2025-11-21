import React, { useEffect, useState } from "react";

export default function WorkerHealthHeatmap() {
  const [heat, setHeat] = useState([]);

  async function loadHeatmap() {
    try {
      const res = await fetch("/api/healthmap");
      const data = await res.json();
      setHeat(data); // [{ hour: "10:00", uptime: 98 }, ...]
    } catch (err) {
      console.error("Heatmap load failed", err);
    }
  }

  useEffect(() => {
    loadHeatmap();
  }, []);

  const getColor = (val) => {
    if (val >= 99) return "bg-green-600";
    if (val >= 95) return "bg-yellow-500";
    if (val >= 80) return "bg-orange-500";
    return "bg-red-600";
  };

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Worker Uptime Heatmap
      </h2>

      <div className="grid grid-cols-6 gap-3">
        {heat.map((h) => (
          <div
            key={h.hour}
            className={`p-4 rounded-lg flex flex-col items-center ${getColor(
              h.uptime
            )}`}
          >
            <p className="text-xs text-white">{h.hour}</p>
            <p className="text-base font-bold text-white">{h.uptime}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
