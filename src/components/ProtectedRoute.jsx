import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authed = localStorage.getItem("admin-authed") === "yes";

  if (!authed) return <Navigate to="/admin-login" replace />;

  return <>{children}</>;
}
