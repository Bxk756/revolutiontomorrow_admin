import React from "react";

export default function DashboardHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-600 rounded"></div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      {subtitle && (
        <p className="text-gray-400 mt-1 text-sm animate-fadeIn">
          {subtitle}
        </p>
      )}
    </div>
  );
}
