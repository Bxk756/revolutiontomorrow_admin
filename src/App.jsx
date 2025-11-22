import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import AdminRoutes from "./AdminRoutes";
import SecurityScoreIndex from "./SecurityScoreIndex";
import SLAStatusPanel from "./SLAStatusPanel";
import SettingsPage from "./pages/SettingsPage";

// AI Pages
import AIStreamingConsole from "./pages/AIStreamingConsole";
import AISOCReportPanel from "./pages/AISOCReportPanel";

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

        {/* NEW ✔ AI Streaming Console */}
        <Route
          path="/admin/ai-stream"
          element={
            <AdminRoutes>
              <AIStreamingConsole />
            </AdminRoutes>
          }
        />

        {/* NEW ✔ AI SOC Report Generator */}
        <Route
          path="/admin/ai-report"
          element={
            <AdminRoutes>
              <AISOCReportPanel />
            </AdminRoutes>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

