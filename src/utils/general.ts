export const normalize = (s: string) => s.trim().toLowerCase();

export const toCsv = (arr?: string[]) => (arr?.length ? arr.join(", ") : "");
