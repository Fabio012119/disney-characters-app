import { useEffect } from "react";
import type { GridApi } from "ag-grid-community";

export function usePreserveTopRowOnPageSize(
  apiRef: React.MutableRefObject<GridApi | null>,
  pageSize: number,
  prevPageSizeRef: React.MutableRefObject<number>
) {
  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const prevSize = prevPageSizeRef.current ?? 50;
    const currentPage = api.paginationGetCurrentPage
      ? api.paginationGetCurrentPage()
      : 0;

    const topRowBefore = currentPage * prevSize;

    api.setGridOption?.("paginationPageSize", pageSize);

    const targetPage = Math.floor(topRowBefore / pageSize);

    setTimeout(() => {
      api.paginationGoToPage?.(targetPage);
      api.ensureIndexVisible?.(topRowBefore, "top");
    }, 0);

    prevPageSizeRef.current = pageSize;
  }, [apiRef, pageSize, prevPageSizeRef]);
}
