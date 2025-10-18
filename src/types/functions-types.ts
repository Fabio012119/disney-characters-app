import type { ApiResponse } from "./api";

export type FetchApiPage = (
  apiPage: number,
  signal: AbortSignal
) => Promise<ApiResponse>;

export type Options = {
  fetchApiPage: FetchApiPage;
  tvQ: string;
  pageSizeRef: React.MutableRefObject<number>;
  setRowCount: (n: number) => void;
};