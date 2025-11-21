import React, { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

export default function SettingsPage() {
  const [name, setName] = useState("Revolution Tomorrow Admin");
  const [email, setEmail] = useState("admin@revolutiontomorrow.cloud");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <DashboardLayout title="Settings">
      <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow max-w-2xl">

        <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>

        {/* Name */}
        <label className="block mb-4">
          <p className="text-sm text-gray-400 mb-1">Admin Display Name</p>
          <input
            type="text"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Email */}
        <label className="block mb-6">
          <p className="text-sm text-gray-400 mb-1">Contact Email</p>
          <input
            type="email"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* API Key */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Admin API Key (read-only)</p>
          <code className="block bg-gray-900 p-3 rounded border border-gray-700 text-xs">
            {apiKey || "No key available"}
          </code>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
        >
          Save Changes
        </button>

        {saved && (
          <p className="text-green-400 text-sm mt-3">Settings saved!</p>
        )}
      </div>
    </DashboardLayout>
  );
}
