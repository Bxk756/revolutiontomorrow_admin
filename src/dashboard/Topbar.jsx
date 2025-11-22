import React from "react";

export default function Topbar({ setMobileOpen }) {
  return (
    <header className="flex items-center justify-between md:hidden px-4 py-3 border-b border-gray-800 bg-[#0f1420]">
      <button
        onClick={() => setMobileOpen(true)}
        className="text-gray-300 hover:text-white"
      >
        ☰
      </button>

      <h1 className="font-semibold text-white tracking-tight">
        Admin Console
      </h1>

      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
        A
      </div>
    </header>
  );
}
