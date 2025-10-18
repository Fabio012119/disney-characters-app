import type { WorkBook, WorkSheet } from "xlsx";

type PiePoint = Highcharts.PointOptionsObject & {
  custom?: { filmsText: string };
};

export async function exportPieXlsx(
  page: number,
  data: PiePoint[],
  nameQ?: string
) {
  const XLSX = await import("xlsx");

  const rows = data.map((p) => ({
    Character: String(p.name ?? ""),
    Films: Number(p.y ?? 0),
    "Film list": extractPlainList(p.custom?.filmsText ?? ""),
  }));

  const ws: WorkSheet = XLSX.utils.json_to_sheet(rows);
  const wb: WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Page_${page}`);

  const suffix = nameQ && nameQ.trim() ? `-name_${sanitize(nameQ)}` : "";
  XLSX.writeFile(wb, `films-per-character-page-${page}${suffix}.xlsx`);
}

function extractPlainList(html: string) {
  return html
    .replace(/^<ul[^>]*>/i, "")
    .replace(/<\/ul>$/i, "")
    .replace(/<li>/gi, "")
    .replace(/<\/li>/gi, "")
    .replace(/<div[^>]*>|<\/div>/gi, "")
    .trim();
}

function sanitize(s: string) {
  return s.replace(/[^a-z0-9-_]+/gi, "_").slice(0, 40);
}
