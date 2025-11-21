import React from "react";

export default function DashboardSection({ title, children }) {
  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-200">{title}</h2>
      )}
      {children}
    </div>
  );
}
