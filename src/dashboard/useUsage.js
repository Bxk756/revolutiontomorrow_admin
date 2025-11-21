import { useEffect, useState } from "react";
import { apiGet } from "./apiClient";

// Hook to load daily usage metrics for the last 30 days
export function useUsage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const json = await apiGet("/v1/usage");
        if (!cancelled) {
          setData(json?.days || []);
        }
      } catch (err) {
        console.error("[useUsage] failed to load usage:", err);
        if (!cancelled) {
          setError(err.message || "Failed to load usage");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
