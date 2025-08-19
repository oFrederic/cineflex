/**
 * Custom hook for localStorage management
 * Provides type-safe localStorage operations with error handling
 */

import { useCallback, useEffect, useState } from 'react';

interface UseLocalStorageOptions {
  serializer?: (value: unknown) => string;
  deserializer?: (value: string) => unknown;
}

/**
 * Custom hook for localStorage with type safety
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, serializer(valueToStore));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue]
  );

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserializer(e.newValue));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(
            `Error parsing localStorage value for key "${key}":`,
            error
          );
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserializer]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for storing objects in localStorage
 */
export function useLocalStorageObject<T extends Record<string, unknown>>(
  key: string,
  initialValue: T
): [T, (value: Partial<T> | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue, removeValue] = useLocalStorage<T>(
    key,
    initialValue
  );

  const setValue = useCallback(
    (value: Partial<T> | ((val: T) => T)) => {
      if (value instanceof Function) {
        setStoredValue(value);
      } else {
        setStoredValue({ ...storedValue, ...value });
      }
    },
    [storedValue, setStoredValue]
  );

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for storing arrays in localStorage
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[]
): [T[], (value: T[] | ((val: T[]) => T[])) => void, () => void] {
  return useLocalStorage<T[]>(key, initialValue);
}

/**
 * Hook for storing primitive values in localStorage
 */
export function useLocalStorageString(
  key: string,
  initialValue: string
): [string, (value: string | ((val: string) => string)) => void, () => void] {
  return useLocalStorage<string>(key, initialValue, {
    serializer: value => String(value),
    deserializer: value => value,
  });
}

export function useLocalStorageNumber(
  key: string,
  initialValue: number
): [number, (value: number | ((val: number) => number)) => void, () => void] {
  return useLocalStorage<number>(key, initialValue, {
    serializer: value => String(value),
    deserializer: value => Number(value),
  });
}

export function useLocalStorageBoolean(
  key: string,
  initialValue: boolean
): [
  boolean,
  (value: boolean | ((val: boolean) => boolean)) => void,
  () => void,
] {
  return useLocalStorage<boolean>(key, initialValue, {
    serializer: value => String(value),
    deserializer: value => value === 'true',
  });
}
