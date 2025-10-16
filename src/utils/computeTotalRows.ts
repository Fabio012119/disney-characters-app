import type { ApiResponse } from "../types/api";
import { API_PAGE_SIZE } from "../constants";

export const computeTotalRows = (pages: ApiResponse[]): number => {
  if (!pages.length) return 0;
  const first = pages[0];
  const last = pages[pages.length - 1];
  const totalPages = first?.info?.totalPages ?? 1;

  if (!last.info?.nextPage) {
    return (totalPages - 1) * API_PAGE_SIZE + (last.data?.length ?? 0);
  }
  return totalPages * API_PAGE_SIZE;
};
