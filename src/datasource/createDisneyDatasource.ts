import { API_PAGE_SIZE } from "@/constants";
import { computeTotalRows } from "@/utils/computeTotalRows";
import { buildRow } from "@/utils/buildRow";
import { normalize } from "@/utils/general";
import type { ApiResponse } from "@/types/api";
import type { Character } from "@/types/general";
import type { Row } from "@/types/table";
import type { IGetRowsParams } from "ag-grid-community";
import type { Options } from "@/types/functions-types";

export function createDisneyDatasource({
  fetchApiPage,
  tvQ,
  pageSizeRef,
  setRowCount,
}: Options) {
  return {
    getRows: async (params: IGetRowsParams) => {
      try {
        const start = params.startRow ?? 0;
        const end = params.endRow ?? start + (pageSizeRef.current ?? 50);

        const apiStart = Math.floor(start / API_PAGE_SIZE) + 1;
        const apiEnd = Math.floor((end - 1) / API_PAGE_SIZE) + 1;

        const controller = new AbortController();
        const pageCount = apiEnd - apiStart + 1;

        const pagePromises: Promise<ApiResponse>[] = Array.from(
          { length: pageCount },
          (_, i) => fetchApiPage(apiStart + i, controller.signal)
        );

        const pages: ApiResponse[] = await Promise.all(pagePromises);

        const totalRows = computeTotalRows(pages);
        setRowCount(totalRows);

        const combined: Character[] = pages.flatMap((p) => p.data ?? []);
        const offset = start % API_PAGE_SIZE;
        const needed = end - start;

        let rows: Row[] = combined.slice(offset, offset + needed).map(buildRow);

        const tv = normalize(tvQ);
        if (tv) {
          rows = rows.filter((r) =>
            (r.raw.tvShows ?? []).some((t) =>
              String(t).toLowerCase().includes(tv)
            )
          );
        }

        const s = params.sortModel?.[0];
        if (s) {
          const dir = s.sort === "asc" ? 1 : -1;

          if (s.colId === "name") {
            rows.sort((a, b) => a.name.localeCompare(b.name) * dir);
          } else if (
            s.colId === "tvShowsCount" ||
            s.colId === "videoGamesCount"
          ) {
            const key = s.colId as "tvShowsCount" | "videoGamesCount";
            rows.sort((a, b) => (a[key] - b[key]) * dir);
          } else if (s.colId === "allies" || s.colId === "enemies") {
            const key = s.colId as "allies" | "enemies";
            rows.sort((a, b) => a[key].localeCompare(b[key]) * dir);
          }
        }

        params.successCallback(rows, totalRows);
      } catch {
        params.failCallback();
      }
    },
  };
}
