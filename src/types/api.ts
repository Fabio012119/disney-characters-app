import type { Character } from "./general";

export type ApiInfo = {
  count: number;
  nextPage?: string | null;
  previousPage?: string | null;
  totalPages: number;
};

export type ApiResponse = {
  data: Character[];
  info: ApiInfo;
};
