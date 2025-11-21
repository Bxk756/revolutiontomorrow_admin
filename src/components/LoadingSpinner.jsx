import React from "react";

export default function LoadingSpinner({ size = 32 }) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-gray-600 border-t-blue-500"
      style={{
        width: size,
        height: size,
        borderTopColor: "#3B82F6",
      }}
    ></div>
  );
}
