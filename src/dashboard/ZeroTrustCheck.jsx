import React, { useEffect, useState } from "react";

export default function ZeroTrustCheck({ userId }) {
  const [report, setReport] = useState(null);

  async function loadZT() {
    try {
      const res = await fetch(`/api/zero_trust?user=${userId || ""}`);
      const json = await res.json();
      setReport(json);
    } catch (err) {
      console.error("Zero Trust error:", err);
    }
  }

  useEffect(() => {
    loadZT();
  }, [userId]);

  if (!report)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Running Zero-Trust evaluation…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Zero-Trust Access Check
      </h2>

      <ul className="space-y-4">
        {report.items?.map((i, idx) => (
          <li
            key={idx}
            className="bg-gray-900 border border-gray-700 p-4 rounded text-sm text-gray-300"
          >
            <p className="font-semibold">{i.category}</p>

            <p
              className={`mt-1 text-xs ${
                i.status === "pass"
                  ? "text-green-400"
                  : i.status === "fail"
                  ? "text-red-500"
                  : "text-yellow-400"
              }`}
            >
              Status: {i.status.toUpperCase()}
            </p>

            <p className="text-xs text-gray-500 mt-1">{i.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
