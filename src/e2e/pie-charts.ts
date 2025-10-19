import { type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";

export default async function PieChart(page: Page) {
  const pieChartsMenuBtn = page.getByTestId("menu-opt-PIE_CHARTS");
  await pieChartsMenuBtn.click();
  await expectVisibleInView(
    page,
    "export-slsx-btn",
    "page-selector",
    "pie-chart"
  );
}
