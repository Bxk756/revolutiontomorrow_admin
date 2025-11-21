import { useEffect, useState } from "react";
import { apiGet } from "./apiClient";

// Hook to load recent events (e.g., last 100)
export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const json = await apiGet("/v1/events");
        if (!cancelled) {
          setEvents(json?.events || []);
        }
      } catch (err) {
        console.error("[useEvents] failed to load events:", err);
        if (!cancelled) {
          setError(err.message || "Failed to load events");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    const interval = setInterval(load, 30_000); // refresh every 30s

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { events, loading, error };
}
