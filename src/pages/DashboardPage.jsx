import React from "react";
import { useAuth } from "../auth/AuthContext";
import SecurityScoreIndex from "../../SecurityScoreIndex";
import SLAStatusPanel from "../../SLAStatusPanel";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-3 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-blue-600/20 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-400">RT</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold">Revolution Tomorrow Admin</h1>
            <p className="text-xs text-slate-400">
              Secure AI operations dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="text-xs text-right">
              <div className="font-medium">{user.email}</div>
              <div className="text-slate-400 capitalize text-[11px]">
                {user.role || "admin"}
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-4">
        <div className="grid gap-4 md:grid-cols-2">
          <SecurityScoreIndex />
          <SLAStatusPanel />
        </div>
      </main>
    </div>
  );
}
