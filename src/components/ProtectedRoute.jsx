import React from "react";

// This works with Cloudflare Access
// The Access JWT is included in request headers, and the Pages app gets it via CF environment
export default function ProtectedRoute({ children }) {
  // Access identity is exposed in Pages under: CF-Access-Client-Id header
  // In local dev, this won't exist so we allow access.
  const hasAuth =
    typeof window !== "undefined" &&
    (window?.__CF_ACCESS_CLIENT_ID__ ||
      import.meta.env.DEV); // allow Vite dev

  if (!hasAuth) {
    return (
      <div className="text-center text-gray-300 py-20">
        <h2 className="text-2xl font-bold mb-3">Access Restricted</h2>
        <p>You must authenticate through Cloudflare Access to view this page.</p>
      </div>
    );
  }

  return children;
}
