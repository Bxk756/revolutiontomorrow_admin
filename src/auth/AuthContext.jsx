import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext(null);

// Key for encrypted storage
const STORAGE_KEY = "rt_admin_user_v2";

// ---- Simple JSON encrypt/decrypt using AES-GCM ----
async function encryptData(data) {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encoded = new TextEncoder().encode(JSON.stringify(data));

  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

  return {
    cipher: Array.from(new Uint8Array(cipher)),
    iv: Array.from(iv),
    key: Array.from(new Uint8Array(exportedKey)),
  };
}

async function decryptData({ cipher, iv, key }) {
  try {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new Uint8Array(key),
      "AES-GCM",
      false,
      ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      cryptoKey,
      new Uint8Array(cipher)
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (err) {
    console.error("Failed to decrypt:", err);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Restore session
  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const restored = await decryptData(parsed);

          if (restored && restored.id) {
            setUser(restored);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        console.error("Session restore failed:", e);
        localStorage.removeItem(STORAGE_KEY);
      }
      setInitializing(false);
    })();
  }, []);

  // ---- login() ----
  const login = useCallback(async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required.");

    // Simulate a real backend delay for cleaner UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    // TODO: Replace with a backend API call
    const loggedUser = {
      id: crypto.randomUUID(),
      email,
      role: "admin",
      loggedInAt: Date.now(),
    };

    const encrypted = await encryptData(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(encrypted));

    setUser(loggedUser);
    return loggedUser;
  }, []);

  // ---- logout() ----
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  // ---- refreshSession() (future-ready for JWT / Supabase / BE API) ----
  const refreshSession = useCallback(async () => {
    if (!user) return;

    // EXAMPLE: hit backend to renew JWT
    // const newSession = await api.refreshToken(user.id);

    // For now, no-op
    return true;
  }, [user]);

  const value = {
    user,
    initializing,
    isAuthenticated: !!user,
    login,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

