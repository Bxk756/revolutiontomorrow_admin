import React from "react";

export default function DashboardGridLayout({ children }) {
  return (
    <div className="flex flex-col gap-10">
      {children}
    </div>
  );
}
