import React, { useEffect, useState } from "react";

export default function AlertPlaybookRunner() {
  const [playbooks, setPlaybooks] = useState([]);
  const [running, setRunning] = useState(null);

  async function loadPlaybooks() {
    try {
      const res = await fetch("/api/playbooks");
      const json = await res.json();
      setPlaybooks(json.playbooks || []);
    } catch (err) {
      console.error("Playbook load error:", err);
    }
  }

  async function runPlaybook(id) {
    setRunning(id);
    try {
      await fetch(`/api/playbooks?id=${id}`, { method: "POST" });
    } catch (err) {
      console.error("Playbook run error:", err);
    }
    setRunning(null);
  }

  useEffect(() => {
    loadPlaybooks();
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Alert Playbook Automation
      </h2>

      <div className="space-y-4">
        {playbooks.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 border border-gray-700 rounded p-4 text-gray-300 text-sm"
          >
            <p className="font-semibold text-gray-200">{p.name}</p>
            <p className="text-xs text-gray-500">{p.description}</p>

            <button
              onClick={() => runPlaybook(p.id)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs"
            >
              {running === p.id ? "Running…" : "Run Playbook"}
            </button>
          </div>
        ))}
      </div>

      {playbooks.length === 0 && (
        <p className="text-gray-500 text-sm">No playbooks defined.</p>
      )}
    </div>
  );
}
