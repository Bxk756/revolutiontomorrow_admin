import React, { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

export default function SettingsPage() {
  const [name, setName] = useState("Revolution Tomorrow Admin");
  const [email, setEmail] = useState("admin@revolutiontomorrow.cloud");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 900);
  }

  function copyKey() {
    navigator.clipboard.writeText(apiKey || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <DashboardLayout title="Settings">
      <div className="bg-[#0f1420] p-6 md:p-8 border border-gray-800 rounded-xl shadow max-w-2xl mx-auto animate-fadeIn">

        <h2 className="text-2xl font-bold mb-6 text-white">
          Admin Settings
        </h2>

        {/* Display Name */}
        <div className="mb-5">
          <label className="block mb-1 text-sm text-gray-400">
            Admin Display Name
          </label>
          <input
            type="text"
            className="w-full p-3 bg-[#111827] border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-400">
            Contact Email
          </label>
          <input
            type="email"
            className="w-full p-3 bg-[#111827] border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* API Key Display */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Admin API Key (read-only)
          </label>

          <div className="relative group">
            <code className="block bg-[#111827] p-3 rounded border border-gray-700 text-xs overflow-x-auto select-none pr-14">
              {apiKey || "No key available"}
            </code>

            {/* Copy Button */}
            <button
              onClick={copyKey}
              className="absolute right-2 top-2 px-2 py-[3px] text-xs bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded font-semibold transition ${
            saving
              ? "bg-gray-700 cursor-default"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {saved && (
          <p className="text-green-400 text-sm mt-3 animate-fadeIn">
            Settings saved!
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
