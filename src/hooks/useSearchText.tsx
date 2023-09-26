import { ChangeEvent, useCallback, useState } from "react";

function useSearchText(baseValue: string) {
  const [searchText, setSearchText] = useState(baseValue);

  const changeSearchText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  return { searchText, changeSearchText, setSearchText };
}

export default useSearchText;
