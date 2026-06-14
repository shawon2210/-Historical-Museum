import { useState, useEffect } from "react";

export function useApi<T = unknown>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(endpoint)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json() as Promise<T>; })
      .then((d) => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
}
