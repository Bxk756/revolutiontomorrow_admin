import React, { useEffect, useState } from "react";

export default function ThreatIntelFeedPanel() {
  const [indicators, setIndicators] = useState([]);

  async function loadFeed() {
    try {
      const res = await fetch("/api/threat_feed");
      const json = await res.json();
      setIndicators(json.indicators || []);
    } catch (err) {
      console.error("Threat feed load error:", err);
    }
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Threat Intelligence Feed
      </h2>

      <div className="space-y-4">
        {indicators.map((i, idx) => (
          <div
            key={idx}
            className="bg-gray-900 border border-gray-700 p-4 rounded text-sm text-gray-300"
          >
            <p className="font-semibold">{i.indicator}</p>
            <p className="text-xs text-gray-500">{i.type}</p>
            <p className="mt-1">Risk: {i.risk}</p>
            <p className="text-xs mt-1 text-gray-400">
              Confidence: {i.confidence}
            </p>
            <p className="text-xs text-blue-400">Source: {i.feed}</p>
          </div>
        ))}
      </div>

      {indicators.length === 0 && (
        <p className="text-gray-500 text-sm">No threat intel loaded.</p>
      )}
    </div>
  );
}
