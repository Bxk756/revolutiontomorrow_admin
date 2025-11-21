import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";

// Later we'll add:
// import SettingsPage from "./pages/SettingsPage";
// import BillingPage from "./pages/BillingPage";
// import LogsPage from "./pages/LogsPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Future pages */}
      {/* <Route path="/settings" element={<SettingsPage />} /> */}
      {/* <Route path="/billing" element={<BillingPage />} /> */}
      {/* <Route path="/logs" element={<LogsPage />} /> */}
    </Routes>
  );
}
