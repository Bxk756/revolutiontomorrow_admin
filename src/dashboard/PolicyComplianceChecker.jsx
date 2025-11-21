import React, { useEffect, useState } from "react";

export default function PolicyComplianceChecker() {
  const [report, setReport] = useState(null);

  async function loadCompliance() {
    try {
      const res = await fetch("/api/compliance_check");
      const json = await res.json();
      setReport(json);
    } catch (err) {
      console.error("Compliance load error:", err);
    }
  }

  useEffect(() => {
    loadCompliance();
  }, []);

  if (!report)
    return (
      <div className="bg-[#111622] p-6 rounded-xl text-gray-400 border border-gray-800">
        Running compliance scan…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Policy Compliance Checker
      </h2>

      <ul className="space-y-4">
        {report.results?.map((r, i) => (
          <li key={i} className="bg-gray-900 p-4 rounded border border-gray-700">
            <p className="font-semibold text-gray-200">{r.policy}</p>
            <p
              className={`text-sm mt-1 ${
                r.status === "pass"
                  ? "text-green-400"
                  : r.status === "fail"
                  ? "text-red-500"
                  : "text-yellow-400"
              }`}
            >
              Status: {r.status.toUpperCase()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {r.details}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
