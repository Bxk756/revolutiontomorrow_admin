import React from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen flex bg-[#020617] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 animate-fadeIn">
        {title && (
          <h1 className="text-3xl font-bold mb-6 tracking-tight">
            {title}
          </h1>
        )}

        <div className="panel p-6 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
}
