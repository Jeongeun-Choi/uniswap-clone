import { useCallback, useState } from "react";

function useToggle(baseValue: boolean) {
  const [toggle, setToggle] = useState(baseValue);

  const changeToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return { toggle, changeToggle, setToggle };
}

export default useToggle;
