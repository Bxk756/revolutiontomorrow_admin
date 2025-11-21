import React, { useEffect, useState } from "react";

export default function ReportScheduleManager() {
  const [reports, setReports] = useState([]);
  const [name, setName] = useState("");
  const [cron, setCron] = useState("");

  async function loadReports() {
    try {
      const res = await fetch("/api/report_schedules");
      const json = await res.json();
      setReports(json.reports || []);
    } catch (err) {
      console.error("Report schedule error:", err);
    }
  }

  async function addReport() {
    try {
      await fetch("/api/report_schedules", {
        method: "POST",
        body: JSON.stringify({ name, cron }),
      });
      setName("");
      setCron("");
      loadReports();
    } catch (err) {
      console.error("Add report schedule error:", err);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Report Schedule Manager
      </h2>

      <div className="bg-black/30 p-4 rounded border border-gray-700 mb-5">
        <input
          className="w-full bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded mb-2"
          placeholder="Report name (e.g. Daily Risk Summary)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded mb-2"
          placeholder="Cron (e.g. 0 8 * * *)"
          value={cron}
          onChange={(e) => setCron(e.target.value)}
        />
        <button
          onClick={addReport}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
        >
          Add Schedule
        </button>
      </div>

      <div className="space-y-3 text-sm text-gray-300">
        {reports.map((r, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-700 p-3 rounded"
          >
            <p className="font-semibold text-gray-100">{r.name}</p>
            <p className="text-xs text-gray-500">Cron: {r.cron}</p>
            <p className="text-xs text-gray-500">Next run: {r.next_run}</p>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No scheduled reports.</p>
      )}
    </div>
  );
}
