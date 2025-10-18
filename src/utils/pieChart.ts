import type Highcharts from "highcharts";
import type { Character } from "@/types/general";

export function toPieSeriesData(rows: Character[]) {
  return rows.map((c) => {
    const films = Array.isArray(c.films) ? c.films : [];
    const filmsText = films.length
      ? `<ul class="hc-tip-list">${films
          .map((f) => `<li>${f}</li>`)
          .join("")}</ul>`
      : `<div class="hc-tip-muted">No films</div>`;
    return {
      name: c.name ?? "Unknown",
      y: films.length,
      custom: {
        filmsText,
      },
    };
  });
}

export function buildPieOptions(
  page: number,
  data: Highcharts.SeriesMapDataOptions[]
): Highcharts.Options {
  return {
    chart: { type: "pie" },
    title: { text: `Films per Character — Page ${page}` },
    credits: { enabled: false },
    tooltip: {
      useHTML: true,
      className: "hc-tooltip-card",
      borderWidth: 0,
      backgroundColor: "transparent",
      pointFormat: `
        <div class="hc-tip">
          <div class="hc-tip-header">
            <span class="hc-tip-name">{point.name}</span>
            <span class="hc-tip-badge">{point.y}</span>
          </div>
          <div class="hc-tip-meter">
            <div class="hc-tip-meter-fill" style="width:{point.percentage:.1f}%"></div>
          </div>
          <div class="hc-tip-meta">{point.percentage:.1f}% of page</div>
          <div class="hc-tip-subtitle">Films</div>
          {point.custom.filmsText}
        </div>
      `,
    },
    plotOptions: {
      pie: {
        dataLabels: { enabled: true, format: "{point.name}: {point.y}" },
      },
    },
    series: [{ type: "pie", name: "Film count", data }],
  };
}

export function range1(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}
