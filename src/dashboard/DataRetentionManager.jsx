import React, { useEffect, useState } from "react";

export default function DataRetentionManager() {
  const [config, setConfig] = useState(null);

  async function load() {
    try {
      const res = await fetch("/api/data_retention");
      const json = await res.json();
      setConfig(json);
    } catch (err) {
      console.error("Retention load error:", err);
    }
  }

  async function save() {
    try {
      await fetch("/api/data_retention", {
        method: "POST",
        body: JSON.stringify(config),
      });
    } catch (err) {
      console.error("Retention save error:", err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!config)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading retention config…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Data Retention Manager
      </h2>

      <div className="space-y-4 text-sm text-gray-300">
        {Object.keys(config).map((key) => (
          <div key={key}>
            <p className="mb-1">{key}</p>
            <input
              type="number"
              className="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded p-2"
              value={config[key]}
              onChange={(e) =>
                setConfig({ ...config, [key]: parseInt(e.target.value) })
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={save}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Save Retention Settings
      </button>
    </div>
  );
}
