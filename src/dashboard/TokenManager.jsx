import React, { useEffect, useState } from "react";

export default function TokenManager() {
  const [tokens, setTokens] = useState([]);
  const [label, setLabel] = useState("");

  async function loadTokens() {
    try {
      const res = await fetch("/api/tokens");
      const json = await res.json();
      setTokens(json.tokens || []);
    } catch (err) {
      console.error("Token load error:", err);
    }
  }

  async function createToken() {
    try {
      await fetch("/api/tokens", {
        method: "POST",
        body: JSON.stringify({ label }),
      });
      setLabel("");
      loadTokens();
    } catch (err) {
      console.error("Token create error:", err);
    }
  }

  async function revokeToken(id) {
    try {
      await fetch(`/api/tokens?id=${id}`, { method: "DELETE" });
      loadTokens();
    } catch (err) {
      console.error("Token revoke error:", err);
    }
  }

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        API Token Manager
      </h2>

      <div className="mb-4">
        <input
          className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded text-sm"
          placeholder="Token label (e.g., staging, backend, CI/CD)…"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button
          onClick={createToken}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Create Token
        </button>
      </div>

      <div className="space-y-3">
        {tokens.map((t) => (
          <div
            key={t.id}
            className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-sm text-gray-300"
          >
            <p className="font-semibold">{t.label}</p>
            <p className="text-xs text-gray-500">ID: {t.id}</p>

            <button
              onClick={() => revokeToken(t.id)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs rounded"
            >
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
