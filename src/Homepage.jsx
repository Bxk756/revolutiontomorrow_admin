import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tight">
          Revolution Tomorrow Admin
        </h1>
        <Link
          to="/admin"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
        >
          Open Admin
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <section className="max-w-2xl text-center animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Operate your AI security stack with confidence.
          </h2>
          <p className="text-gray-400 mb-6">
            This admin console gives you real-time visibility into security scores,
            SLA health, and core configuration for your AI infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/admin"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition hover-glow"
            >
              Go to Admin Dashboard
            </Link>
            <a
              href="https://www.revolutiontomorrow.cloud/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition"
            >
              View Public Site
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
