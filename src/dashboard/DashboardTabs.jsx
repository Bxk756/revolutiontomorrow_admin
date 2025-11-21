import React from "react";
import { NavLink } from "react-router-dom";

export default function DashboardTabs() {
  const tabs = [
    { label: "Overview", to: "/dashboard" },
    { label: "Analytics", to: "/dashboard#analytics" },
    { label: "Risk Intelligence", to: "/dashboard#risk" },
    { label: "Event Logs", to: "/logs" },
  ];

  return (
    <div className="flex gap-3 mb-6 border-b border-gray-800 pb-2">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `px-3 py-1.5 text-sm rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
