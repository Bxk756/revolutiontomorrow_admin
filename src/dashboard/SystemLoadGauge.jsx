import React, { useEffect, useState } from "react";

export default function SystemLoadGauge() {
  const [load, setLoad] = useState({ cpu: 0, memory: 0 });

  async function loadMetrics() {
    try {
      const res = await fetch("/api/system_load");
      const json = await res.json();
      setLoad(json);
    } catch (err) {
      console.error("System load error:", err);
    }
  }

  useEffect(() => {
    loadMetrics();
    const int = setInterval(loadMetrics, 10000);
    return () => clearInterval(int);
  }, []);

  const cpuDeg = (load.cpu / 100) * 180;
  const memDeg = (load.memory / 100) * 180;

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        System Load
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* CPU Gauge */}
        <div className="text-center">
          <div className="relative w-32 h-16 overflow-hidden mx-auto">
            <div
              className="absolute left-0 top-0 w-32 h-32 rounded-full border-8 border-blue-500 border-b-transparent"
              style={{
                transform: `rotate(${cpuDeg}deg)`,
                transition: "0.4s ease",
              }}
            ></div>
          </div>
          <p className="text-gray-300 text-sm mt-2">CPU Load</p>
          <p className="text-xl font-bold text-blue-400">{load.cpu}%</p>
        </div>

        {/* Memory Gauge */}
        <div className="text-center">
          <div className="relative w-32 h-16 overflow-hidden mx-auto">
            <div
              className="absolute left-0 top-0 w-32 h-32 rounded-full border-8 border-green-500 border-b-transparent"
              style={{
                transform: `rotate(${memDeg}deg)`,
                transition: "0.4s ease",
              }}
            ></div>
          </div>
          <p className="text-gray-300 text-sm mt-2">Memory Load</p>
          <p className="text-xl font-bold text-green-400">{load.memory}%</p>
        </div>

      </div>
    </div>
  );
}
