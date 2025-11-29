import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  // While checking the session state
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="animate-pulse text-slate-400 text-sm">
          Checking session…
        </div>
      </div>
    );
  }

  // Not logged in → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Good → show protected content
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
              <div className="animate-pulse text-slate-400 text-sm">
                Loading…
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

      

