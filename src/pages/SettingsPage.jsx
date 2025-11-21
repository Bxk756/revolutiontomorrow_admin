import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>

        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Admin API Key (read-only)</p>
          <code className="block bg-gray-900 p-3 rounded border border-gray-700 text-sm">
            {apiKey || "No key injected"}
          </code>
        </div>

        <div className="mt-6 text-gray-300 text-sm">
          <p>Version: 0.1.0</p>
          <p className="opacity-70">Revolution Tomorrow Admin Console</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
