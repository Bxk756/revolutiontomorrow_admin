import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LogsPage from "./pages/LogsPage";
import BillingPage from "./pages/BillingPage";
import BillingSuccess from "./pages/BillingSuccess";
import BillingCancel from "./pages/BillingCancel";
import SettingsPage from "./pages/SettingsPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/billing/success" element={<BillingSuccess />} />
      <Route path="/billing/cancel" element={<BillingCancel />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
