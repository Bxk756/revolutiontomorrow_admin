import React, { useEffect, useState } from "react";

export default function WorkforceIdentityPanel() {
  const [identities, setIdentities] = useState([]);

  async function loadIdentities() {
    try {
      const res = await fetch("/api/identities");
      const json = await res.json();
      setIdentities(json.identities || []);
    } catch (err) {
      console.error("Identities load error:", err);
    }
  }

  useEffect(() => {
    loadIdentities();
    const int = setInterval(loadIdentities, 15000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Workforce Identity Panel
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {identities.map((u, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-900 border border-gray-700 rounded text-gray-300 text-sm"
          >
            <p className="font-semibold text-gray-200">{u.name}</p>
            <p className="text-xs text-gray-500">{u.email}</p>

            <p className="mt-1">Role: {u.role}</p>
            <p>Status: {u.status}</p>
            <p>MFA: {u.mfa_enabled ? "Enabled" : "Disabled"}</p>

            <p className="text-xs text-blue-400 mt-1">
              Last Login: {u.last_login}
            </p>

            <p className="text-xs mt-1 text-gray-400">
              Risk Score: {u.risk_score}
            </p>
          </div>
        ))}
      </div>

      {identities.length === 0 && (
        <p className="text-gray-500 text-sm">No identities found.</p>
      )}
    </div>
  );
}
