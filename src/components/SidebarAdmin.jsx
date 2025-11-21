import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarAdmin() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-56 bg-[#0D121F] border-r border-gray-800 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Admin Menu</h2>

      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>

      <NavLink to="/logs" className={linkClass}>
        Event Logs
      </NavLink>

      <NavLink to="/billing" className={linkClass}>
        Billing
      </NavLink>

      <NavLink to="/settings" className={linkClass}>
        Settings
      </NavLink>
    </aside>
  );
}
