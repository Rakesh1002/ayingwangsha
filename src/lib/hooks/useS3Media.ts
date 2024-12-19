import { useState, useEffect } from "react";

interface CacheEntry {
  url: string;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const mediaCache = new Map<string, CacheEntry>();

export function useS3Media(key: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Check cache first
        const cached = mediaCache.get(key);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setUrl(cached.url);
          setIsLoading(false);
          return;
        }

        // Fetch from S3
        const response = await fetch(
          `/api/media?key=${encodeURIComponent(key)}`,
        );
        if (!response.ok) throw new Error("Failed to fetch media");

        const { url } = await response.json();

        // Update cache
        mediaCache.set(key, { url, timestamp: Date.now() });

        setUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [key]);

  return { url, isLoading, error };
}
