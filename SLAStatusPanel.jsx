import React from "react";
import DashboardLayout from "./dashboard/DashboardLayout";

export default function SLAStatusPanel() {
  const uptime = 99.94;
  const incidents = 1;

  return (
    <DashboardLayout title="SLA & Uptime Status">
      <div className="space-y-6">

        {/* Top summary */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="panel p-5">
            <p className="text-sm text-gray-400 mb-1">Current Uptime (30 days)</p>
            <p className="text-3xl font-bold text-green-400">
              {uptime}%
            </p>
          </div>

          <div className="panel p-5">
            <p className="text-sm text-gray-400 mb-1">Active Incidents</p>
            <p className={`text-3xl font-bold ${
              incidents === 0 ? "text-green-400" : "text-yellow-400"
            }`}>
              {incidents}
            </p>
          </div>

          <div className="panel p-5">
            <p className="text-sm text-gray-400 mb-1">SLA Tier</p>
            <p className="text-2xl font-bold text-blue-400">Enterprise 99.9%</p>
          </div>
        </div>

        {/* History / log */}
        <div className="panel p-5">
          <h2 className="text-lg font-semibold mb-3">Recent Events</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center justify-between">
              <span>2025-11-20 — Elevated latency on ThreatDetector</span>
              <span className="text-yellow-400">Resolved</span>
            </li>
            <li className="flex items-center justify-between">
              <span>2025-11-18 — Scheduled maintenance window</span>
              <span className="text-gray-400">Completed</span>
            </li>
            <li className="flex items-center justify-between">
              <span>2025-11-12 — No incidents reported</span>
              <span className="text-green-400">Healthy</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
