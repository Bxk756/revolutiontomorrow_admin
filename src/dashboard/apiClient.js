// Simple client for talking to the Revolution Tomorrow API from the admin UI

const API_BASE = "https://api.revolutiontomorrow.cloud";

// This is injected at build time from Cloudflare Pages env vars.
// In the Pages dashboard, set VITE_ADMIN_API_KEY = your real API key.
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

if (!ADMIN_API_KEY) {
  // This will show in the browser console if you forgot to configure the env var.
  console.warn(
    "[RevolutionTomorrow Admin] VITE_ADMIN_API_KEY is not set. " +
      "API requests will fail with 401/403."
  );
}

async function handleResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      `API error: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return data;
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADMIN_API_KEY || "",
    },
  });

  return handleResponse(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADMIN_API_KEY || "",
    },
    body: JSON.stringify(body || {}),
  });

  return handleResponse(res);
}
