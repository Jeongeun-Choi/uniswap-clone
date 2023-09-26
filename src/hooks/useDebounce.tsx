import { useEffect, useState } from "react";

function useDebounce(baseValue: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(baseValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(baseValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [baseValue, delay]);

  return debounceValue;
}

export default useDebounce;
