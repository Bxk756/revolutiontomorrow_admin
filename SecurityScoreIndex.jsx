import React from "react";
import DashboardLayout from "./dashboard/DashboardLayout";

export default function SecurityScoreIndex() {
  const score = 82;

  const color =
    score >= 90 ? "text-green-400" :
    score >= 70 ? "text-yellow-400" :
    "text-red-400";

  return (
    <DashboardLayout title="Security Score Overview">
      <div className="space-y-6">

        {/* Score */}
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-2">
            <span className={color}>{score}</span>
            <span className="text-gray-400 text-2xl ml-1">/ 100</span>
          </h2>
          <p className="text-gray-400">Live system health rating</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div
            className="bg-blue-600 h-full rounded-full transition-all"
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Category breakdown */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: "Credential Security", value: 90 },
            { label: "API Hardening", value: 75 },
            { label: "Uptime & SLA", value: 88 },
          ].map((item, idx) => (
            <div key={idx} className="panel p-4 animate-fadeIn">
              <p className="font-semibold mb-2">{item.label}</p>
              <p className="text-xl font-bold text-blue-400">
                {item.value}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

