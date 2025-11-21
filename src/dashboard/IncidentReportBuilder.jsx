import React, { useEffect, useState } from "react";

export default function IncidentReportBuilder({ eventId }) {
  const [report, setReport] = useState(null);

  async function loadReport() {
    if (!eventId) {
      setReport(null);
      return;
    }

    try {
      const res = await fetch(`/api/incident_report?event_id=${eventId}`);
      const json = await res.json();
      setReport(json);
    } catch (err) {
      console.error("Incident report error:", err);
    }
  }

  useEffect(() => {
    loadReport();
  }, [eventId]);

  async function exportPDF() {
    const res = await fetch(`/api/incident_report/export?event_id=${eventId}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `incident_${eventId}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!eventId)
    return (
      <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl text-gray-500">
        Select an event to generate an incident report.
      </div>
    );

  if (!report)
    return (
      <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl text-gray-400">
        Generating report…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-100 mb-3">
        Incident Report
      </h2>

      <div className="text-sm text-gray-300 space-y-4">
        <p><strong>Event ID:</strong> {report.event_id}</p>
        <p><strong>Detection Time:</strong> {report.detected_at}</p>
        <p><strong>Risk Level:</strong> {report.risk}</p>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Root Cause:</strong> {report.root_cause}</p>

        <div>
          <p className="mb-1"><strong>Recommended Actions:</strong></p>
          <ul className="list-disc ml-5 space-y-1">
            {report.actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={exportPDF}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Export PDF
      </button>
    </div>
  );
}
