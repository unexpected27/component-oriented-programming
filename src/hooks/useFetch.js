import { useState, useEffect, useCallback } from 'react';

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [prevUrl, setPrevUrl] = useState(url);

  if (url !== prevUrl) {
    setPrevUrl(url);
    setLoading(Boolean(url));
    setError(null);
  }

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!url) {
      return;
    }

    const controller = new AbortController();

    fetch(url, {
      ...options,
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Network request failed');
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url, options, reloadKey]);

  return { data, loading, error, refetch };
}
