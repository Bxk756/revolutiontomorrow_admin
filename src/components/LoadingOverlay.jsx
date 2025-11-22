import React from "react";

export default function LoadingOverlay({ label = "Loading…" }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
      <div className="panel px-8 py-6 flex flex-col items-center gap-3 animate-fadeIn">
        <div className="w-8 h-8 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-300">{label}</p>
      </div>
    </div>
  );
}
