import type { GridApi } from "ag-grid-community";
import { useEffect, useRef } from "react";

export function useDebouncedQuery(
  nameInput: string,
  tvInput: string,
  setNameQ: (v: string) => void,
  setTvQ: (v: string) => void,
  apiRef: React.MutableRefObject<GridApi | null>,
  delay = 300
) {
  const firstRun = useRef(true);
  const lastKey = useRef<string>("");

  useEffect(() => {
    const key = JSON.stringify({ nameInput, tvInput });

    if (firstRun.current) {
      firstRun.current = false;
      lastKey.current = key;
      return;
    }

    if (key === lastKey.current) return;
    lastKey.current = key;

    const t = setTimeout(() => {
      setNameQ(nameInput);
      setTvQ(tvInput);
      apiRef.current?.purgeInfiniteCache?.();
    }, delay);

    return () => clearTimeout(t);
  }, [nameInput, tvInput, setNameQ, setTvQ, delay, apiRef]);
}
