import React, { useEffect, useState } from "react";

export default function ThreatLevelBanner() {
  const [level, setLevel] = useState("normal");

  async function loadLevel() {
    try {
      const res = await fetch("/api/global_risk");
      const json = await res.json();
      setLevel(json.level || "normal");
    } catch (err) {
      console.error("Global risk error:", err);
    }
  }

  useEffect(() => {
    loadLevel();
    const int = setInterval(loadLevel, 15000);
    return () => clearInterval(int);
  }, []);

  const colors = {
    normal: "bg-gray-700 text-gray-200",
    elevated: "bg-yellow-600 text-black",
    high: "bg-orange-600 text-black",
    critical: "bg-red-600 text-white",
  };

  return (
    <div className={`${colors[level]} py-2 px-4 text-sm font-semibold rounded-lg mb-6`}>
      Global Threat Level: {level.toUpperCase()}
    </div>
  );
}
