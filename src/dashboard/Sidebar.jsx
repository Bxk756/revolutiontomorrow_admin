import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Settings", path: "/admin/settings" },
  { name: "Security Score", path: "/admin/security" },
  { name: "SLA Panel", path: "/admin/sla" }
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#0f1420] border-r border-gray-800 p-5 hidden md:flex flex-col">
      <h2 className="text-lg font-semibold mb-6">Admin Menu</h2>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive
                  ? "sidebar-active"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
