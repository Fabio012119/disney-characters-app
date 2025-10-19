import { type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";

export default async function SideBar(page: Page) {
  await expectVisibleInView(
    page,
    "side-bar",
    "disney-admin-text",
    "menu-opt-DATA_TABLE",
    "menu-opt-PIE_CHARTS"
  );
}
