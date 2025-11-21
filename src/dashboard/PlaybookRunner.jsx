import React, { useEffect, useState } from "react";

export default function PlaybookRunner({ eventId }) {
  const [playbooks, setPlaybooks] = useState([]);
  const [status, setStatus] = useState("");

  async function loadPlaybooks() {
    try {
      const res = await fetch("/api/playbooks");
      const json = await res.json();
      setPlaybooks(json.playbooks || []);
    } catch (err) {
      console.error("Error loading playbooks:", err);
    }
  }

  async function runPlaybook(id) {
    setStatus("Running...");
    try {
      const res = await fetch(`/api/playbook/run?id=${id}&event=${eventId}`);
      const json = await res.json();
      setStatus(json.status || "Completed.");
    } catch (err) {
      console.error("Playbook error:", err);
      setStatus("Error running playbook.");
    }
  }

  useEffect(() => {
    loadPlaybooks();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Automated Incident Playbooks
      </h2>

      {!eventId && (
        <p className="text-sm text-gray-500">
          Select an event to enable playbooks.
        </p>
      )}

      {playbooks.length === 0 && (
        <p className="text-gray-400 text-sm">No playbooks available.</p>
      )}

      <div className="space-y-3">
        {playbooks.map((pb) => (
          <button
            key={pb.id}
            onClick={() => runPlaybook(pb.id)}
            disabled={!eventId}
            className="w-full text-left bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-sm text-gray-200 px-4 py-2 rounded-lg border border-gray-700"
          >
            <p className="font-semibold">{pb.name}</p>
            <p className="text-xs text-gray-400">{pb.description}</p>
          </button>
        ))}
      </div>

      {status && (
        <p className="text-xs text-blue-400 mt-3">{status}</p>
      )}
    </div>
  );
}
