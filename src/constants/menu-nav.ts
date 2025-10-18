import type { DashboardView } from "@/redux/reducers/viewsSlice";

export const nav: { label: string; view: DashboardView }[] = [
  { label: "Data Table", view: "DATA_TABLE" },
  { label: "Pie Charts", view: "PIE_CHARTS" },
];