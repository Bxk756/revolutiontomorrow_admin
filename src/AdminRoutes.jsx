import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoutes({ children }) {
  const isAuthenticated = true; // patch this later for real admin auth

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
}
