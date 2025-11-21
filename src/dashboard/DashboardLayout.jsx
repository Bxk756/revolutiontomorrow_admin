import React from "react";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Top bar */}
      <header className="w-full border-b border-gray-800 bg-[#0D121F]/80 backdrop-blur-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="text-sm text-gray-400">Revolution Tomorrow • Admin</div>
      </header>

      {/* Main content container */}
      <main className="max-w-6xl mx-auto py-10 px-6">{children}</main>
    </div>
  );
}
