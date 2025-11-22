import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import AdminRoutes from "./AdminRoutes";
import SecurityScoreIndex from "./SecurityScoreIndex";
import SLAStatusPanel from "./SLAStatusPanel";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing */}
        <Route path="/" element={<Homepage />} />

        {/* Admin shell (protected) */}
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <SecurityScoreIndex />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/security"
          element={
            <AdminRoutes>
              <SecurityScoreIndex />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/sla"
          element={
            <AdminRoutes>
              <SLAStatusPanel />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminRoutes>
              <SettingsPage />
            </AdminRoutes>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
