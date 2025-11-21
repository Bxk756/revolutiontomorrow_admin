import React, { useEffect, useState } from "react";

export default function GeoActivityMap() {
  const [geo, setGeo] = useState({});

  async function loadGeo() {
    try {
      const res = await fetch("/api/geo_events");
      const data = await res.json();
      setGeo(data); // { US: 45, CA: 12, IN: 8, ... }
    } catch (err) {
      console.error("Geo map error:", err);
    }
  }

  useEffect(() => {
    loadGeo();
  }, []);

  const intensityColor = (count) => {
    if (!count) return "fill-gray-700";
    if (count < 5) return "fill-blue-700";
    if (count < 20) return "fill-blue-500";
    if (count < 50) return "fill-blue-400";
    return "fill-blue-300";
  };

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Geo Activity Map
      </h2>

      <p className="text-gray-400 text-sm mb-3">
        Shows where recent API events originated.
      </p>

      {/* Simple SVG World Map */}
      <div className="w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2000 1001"
          className="w-full"
        >
          {Object.keys(geo).map((countryCode) => (
            <path
              key={countryCode}
              d={countryPaths[countryCode]} 
              className={`${intensityColor(geo[countryCode])} stroke-gray-900`}
            />
          ))}
        </svg>
      </div>

      <p className="text-gray-500 text-xs mt-3">
        * This uses region-based activity intensity shading.
      </p>
    </div>
  );
}

/**
 * NOTE:
 * The "countryPaths" object should be placed ABOVE in a separate 
 * file if needed. For now, this component expects you to add 
 * mappings later OR replace with a world-map NPM library.
 */
const countryPaths = {};
