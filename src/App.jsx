import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import NavbarAdmin from "./components/NavbarAdmin";
import SidebarAdmin from "./components/SidebarAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#0A0F18] text-white">
        {/* Sidebar */}
        <SidebarAdmin />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <NavbarAdmin />

          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* More pages coming soon */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
