import { useEffect } from "react";
import type { GridApi } from "ag-grid-community";

export function useDebouncedQuery(
  nameInput: string,
  tvInput: string,
  setNameQ: (v: string) => void,
  setTvQ: (v: string) => void,
  apiRef: React.MutableRefObject<GridApi | null>,
  delay = 300
) {
  useEffect(() => {
    const t = setTimeout(() => {
      setNameQ(nameInput);
      setTvQ(tvInput);
      apiRef.current?.purgeInfiniteCache();
    }, delay);
    return () => clearTimeout(t);
  }, [nameInput, tvInput, setNameQ, setTvQ, apiRef, delay]);
}
