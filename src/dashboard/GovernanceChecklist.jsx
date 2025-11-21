import React, { useEffect, useState } from "react";

export default function GovernanceChecklist() {
  const [items, setItems] = useState([]);

  async function loadChecklist() {
    try {
      const res = await fetch("/api/governance_checklist");
      const json = await res.json();
      setItems(json.items || []);
    } catch (err) {
      console.error("Governance checklist error:", err);
    }
  }

  useEffect(() => {
    loadChecklist();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Governance & Controls Checklist
      </h2>

      <ul className="space-y-3 text-sm text-gray-300">
        {items.map((i, idx) => (
          <li
            key={idx}
            className="bg-gray-900 border border-gray-700 p-3 rounded"
          >
            <p className="font-semibold text-gray-100">{i.title}</p>
            <p className="text-xs text-gray-500 mb-1">{i.category}</p>
            <p className="text-xs text-gray-400 mb-2">{i.description}</p>
            <p
              className={`text-xs ${
                i.status === "complete"
                  ? "text-green-400"
                  : i.status === "in-progress"
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}
            >
              Status: {i.status.toUpperCase()}
            </p>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">
          No governance items loaded.
        </p>
      )}
    </div>
  );
}
