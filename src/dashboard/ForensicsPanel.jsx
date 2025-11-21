import React, { useEffect, useState } from "react";

export default function ForensicsPanel({ eventId }) {
  const [report, setReport] = useState(null);

  async function loadForensics() {
    if (!eventId) {
      setReport(null);
      return;
    }

    try {
      const res = await fetch(`/api/forensics?event_id=${eventId}`);
      const json = await res.json();
      setReport(json);
    } catch (err) {
      console.error("Forensics load error:", err);
    }
  }

  useEffect(() => {
    loadForensics();
  }, [eventId]);

  if (!eventId)
    return (
      <div className="bg-[#111622] p-6 rounded-xl text-gray-500 border border-gray-800">
        Select an event to view forensics data.
      </div>
    );

  if (!report)
    return (
      <div className="bg-[#111622] p-6 rounded-xl text-gray-400 border border-gray-800">
        Loading deep forensics…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">
        Deep Forensics Analysis
      </h2>

      <div className="space-y-4 text-sm text-gray-300">

        <div>
          <p className="text-xs text-gray-500 mb-1">HTTP Metadata:</p>
          <pre className="bg-black/20 p-3 rounded border border-gray-800 whitespace-pre-wrap">
{JSON.stringify(report.http_metadata, null, 2)}
          </pre>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Indicators:</p>
          <pre className="bg-black/20 p-3 rounded border border-gray-800 whitespace-pre-wrap">
{JSON.stringify(report.indicators, null, 2)}
          </pre>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Fingerprint Hashes:</p>
          <pre className="bg-black/20 p-3 rounded border border-gray-800 whitespace-pre-wrap">
{JSON.stringify(report.fingerprints, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
