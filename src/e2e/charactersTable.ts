import { expect, test, type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";
import CharactersModal from "./character-modal";

export default async function CharactersTable(page: Page) {
  await expectVisibleInView(
    page,
    "characters-table",
    "table-input-Search by name-label",
    "table-input-Search by name",
    "table-input-Filter by TV show",
    "menu-opt-PIE_CHARTS",
    "table-rows-per-page",
  );

  const pagePagination = page.locator(".ag-paging-page-summary-panel");
  await expect(pagePagination).toBeVisible();
  await expect(pagePagination).toBeInViewport();

  const nameInput = page.getByTestId("table-input-Search by name");
  await nameInput.scrollIntoViewIfNeeded();
  await nameInput.fill("Achilles");

  const currentRow = page.locator(".test-row").nth(0);
  await currentRow.click();

  await test.step("Testing characters details in modal..", async () => {
    await CharactersModal(page);
  });
}
