/**
 * Custom hook for debouncing values
 * Useful for search inputs, API calls, and other frequent updates
 */

import { useEffect, useState } from 'react';

/**
 * Debounce a value with a specified delay
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce a callback function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      callback(...args);
    }, delay);

    setDebounceTimer(timer);
  }) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}

/**
 * Hook for debouncing search queries
 */
export function useSearchDebounce(
  searchQuery: string,
  delay: number = 300
): string {
  return useDebounce(searchQuery, delay);
}

/**
 * Hook for debouncing scroll events
 */
export function useScrollDebounce(
  scrollPosition: number,
  delay: number = 100
): number {
  return useDebounce(scrollPosition, delay);
}

/**
 * Hook for debouncing window resize events
 */
export function useResizeDebounce(
  windowSize: { width: number; height: number },
  delay: number = 250
): { width: number; height: number } {
  return useDebounce(windowSize, delay);
}
