import { useCallback, useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const handler = useCallback(
    (val: T) => {
      const timer = setTimeout(() => {
        setDebouncedValue(val);
      }, delay);
      return () => clearTimeout(timer);
    },
    [delay]
  );

  // Update debounced value
  useEffect(() => {
    const cleanup = handler(value);
    return cleanup;
  }, [value, handler]);

  return debouncedValue;
};

export const useDebouncedValue = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
