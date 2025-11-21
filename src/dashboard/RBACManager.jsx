import React, { useEffect, useState } from "react";

export default function RBACManager() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  async function loadRoles() {
    try {
      const res = await fetch("/api/rbac");
      const json = await res.json();
      setRoles(json.roles || []);
    } catch (err) {
      console.error("RBAC load error:", err);
    }
  }

  async function addRole() {
    try {
      await fetch("/api/rbac", {
        method: "POST",
        body: JSON.stringify({ role: newRole }),
      });
      setNewRole("");
      loadRoles();
    } catch (err) {
      console.error("RBAC add role error:", err);
    }
  }

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Role-Based Access Control
      </h2>

      <div className="mb-4">
        <input
          className="bg-gray-800 text-gray-200 px-3 py-2 rounded text-sm w-full"
          placeholder="New role name (e.g. admin, viewer, analyst)"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />

        <button
          onClick={addRole}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Create Role
        </button>
      </div>

      <div className="space-y-3">
        {roles.map((r, idx) => (
          <div
            key={idx}
            className="bg-gray-900 border border-gray-700 p-4 rounded text-sm text-gray-300"
          >
            <p className="font-semibold">{r.name}</p>
            <p className="text-xs text-gray-500 mt-1">{r.permissions.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
