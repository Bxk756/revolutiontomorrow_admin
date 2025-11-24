import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Restore user from localStorage on load
  useEffect(() => {
    const stored = localStorage.getItem("rt_admin_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("rt_admin_user");
      }
    }
    setInitializing(false);
  }, []);

  // Mock login – replace later with real API call
  async function login(email, password) {
    // TODO: call your real backend here
    // For now, accept any non-empty email/password
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const fakeUser = {
      id: "demo-user",
      email,
      role: "admin"
    };

    setUser(fakeUser);
    localStorage.setItem("rt_admin_user", JSON.stringify(fakeUser));
    return fakeUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("rt_admin_user");
  }

  const value = {
    user,
    initializing,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
