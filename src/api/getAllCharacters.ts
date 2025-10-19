import { API_PAGE_SIZE, API_BASE } from "@/constants";
import type { ApiResponse } from "@/types/api";

export function getAllCharacters(nameQ?: string) {
  return async function fetchApiPage(
    apiPage: number,
    signal: AbortSignal
  ): Promise<ApiResponse> {
    const p = new URLSearchParams({
      page: String(apiPage),
      pageSize: String(API_PAGE_SIZE),
    });
    const nameClean = nameQ?.trim();
    if (nameClean) p.set("name", nameClean);

    const res = await fetch(`${API_BASE}/character?${p.toString()}`, {
      signal,
    });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as ApiResponse;
  };
}
