import { useEffect, useState } from 'react';

export const useRotatingIndex = (
  count: number,
  intervalMs: number,
  enabled: boolean,
): number => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || count <= 1) {
      setIndex(0);
      return;
    }

    setIndex(0);
    const timer = window.setInterval(() => {
      setIndex((previous: number) => (previous + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, intervalMs, enabled]);

  return count > 0 ? index % count : 0;
};
