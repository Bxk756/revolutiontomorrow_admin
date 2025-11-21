import React, { useState, useEffect } from "react";

export default function AlertRulesEditor() {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({
    name: "",
    contains: "",
    risk: "elevated",
  });
  const [status, setStatus] = useState("");

  async function loadRules() {
    try {
      const res = await fetch("/api/alert_rules");
      const json = await res.json();
      setRules(json.rules || []);
    } catch (err) {
      console.error("Error loading alert rules:", err);
    }
  }

  async function saveRule() {
    setStatus("Saving...");
    try {
      await fetch("/api/alert_rules", {
        method: "POST",
        body: JSON.stringify(newRule),
      });
      setStatus("Rule saved.");
      setNewRule({ name: "", contains: "", risk: "elevated" });
      loadRules();
    } catch (err) {
      setStatus("Error saving rule.");
    }
  }

  useEffect(() => {
    loadRules();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Custom Alert Rule Builder
      </h2>

      {/* Create Rule */}
      <div className="bg-black/20 p-4 rounded-xl border border-gray-700 mb-6">
        <h3 className="text-gray-300 text-sm mb-2 font-semibold">
          Create New Rule
        </h3>

        <input
          className="bg-gray-800 text-gray-200 text-sm px-3 py-2 w-full rounded mb-2"
          placeholder="Rule name"
          value={newRule.name}
          onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
        />

        <input
          className="bg-gray-800 text-gray-200 text-sm px-3 py-2 w-full rounded mb-2"
          placeholder="Trigger if input contains…"
          value={newRule.contains}
          onChange={(e) => setNewRule({ ...newRule, contains: e.target.value })}
        />

        <select
          className="bg-gray-800 text-gray-200 text-sm px-3 py-2 w-full rounded mb-2"
          value={newRule.risk}
          onChange={(e) => setNewRule({ ...newRule, risk: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="elevated">Elevated</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <button
          onClick={saveRule}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
        >
          Save Rule
        </button>

        <p className="text-xs text-gray-500 mt-2">{status}</p>
      </div>

      {/* Existing Rules */}
      <h3 className="text-gray-300 text-sm font-semibold mb-2">
        Existing Rules
      </h3>

      <div className="space-y-2">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 p-3 rounded text-sm text-gray-300"
          >
            <p><strong>{rule.name}</strong></p>
            <p className="text-gray-400 text-xs">
              Trigger: contains "{rule.contains}"
            </p>
            <p className="text-xs">
              Risk: <span className="text-blue-400">{rule.risk}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
