import React from "react";
import DashboardLayout from "./dashboard/DashboardLayout";

export default function AdminAnalyticsPanel() {

  const metrics = [
    { label: "Threat Events (24h)", value: 12 },
    { label: "API Requests", value: "42,188" },
    { label: "Blocked Anomalies", value: 241 },
    { label: "Active Watchers", value: 18 }
  ];

  return (
    <DashboardLayout title="Admin Analytics">
      <div className="grid md:grid-cols-4 gap-5 mb-8">
        {metrics.map((m, idx) => (
          <div key={idx} className="panel p-5 animate-fadeIn">
            <p className="text-sm text-gray-400">{m.label}</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="panel p-6 animate-fadeIn text-gray-300">
        <p>More charts and analytics will be added here as your backend evolves.</p>
      </div>
    </DashboardLayout>
  );
}
