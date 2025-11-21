import React, { useEffect, useState } from "react";

export default function GlobalConfigEditor() {
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadConfig() {
    try {
      const res = await fetch("/api/config");
      const json = await res.json();
      setConfig(json);
    } catch (err) {
      console.error("Config load error:", err);
    }
  }

  async function saveConfig() {
    setSaving(true);
    try {
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify(config),
      });
    } catch (err) {
      console.error("Config save error:", err);
    }
    setSaving(false);
  }

  useEffect(() => {
    loadConfig();
  }, []);

  if (!config)
    return (
      <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl text-gray-400">
        Loading configuration…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Global Config Editor
      </h2>

      <textarea
        className="w-full h-64 bg-gray-900 border border-gray-700 text-gray-300 p-4 rounded text-sm"
        value={JSON.stringify(config, null, 2)}
        onChange={(e) => {
          try {
            setConfig(JSON.parse(e.target.value));
          } catch {}
        }}
      />

      <button
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        disabled={saving}
        onClick={saveConfig}
      >
        {saving ? "Saving…" : "Save Configuration"}
      </button>
    </div>
  );
}
