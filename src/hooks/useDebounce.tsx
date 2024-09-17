import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay = 500) {
  const [debounceValue, setDebounceValue] = useState<T>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);
  return { debounceValue, setDebounceValue };
}

export default useDebounce;
