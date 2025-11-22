import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileSidebar({ open, setOpen }) {
  if (!open) return null;

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Security Score", path: "/admin/security" },
    { name: "SLA Panel", path: "/admin/sla" }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 animate-fadeIn">
      <div className="w-64 bg-[#0f1420] h-full p-5 border-r border-gray-800 animate-slideIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Admin Menu</h2>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
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
      </div>
    </div>
  );
}
