import React, { useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      window.location.href = "/admin";
    }, 900);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="panel p-8 max-w-sm w-full animate-fadeIn">
        <h1 className="text-2xl font-bold mb-5 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold ${
              loading ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Checking…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
