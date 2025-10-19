import { expect, type Page } from "@playwright/test";

export async function expectVisibleInView(page: Page, ...ids: string[]) {
  for (const id of ids) {
    await page.waitForLoadState("networkidle");
    const el = page.getByTestId(id);
    el.scrollIntoViewIfNeeded();
    await expect(el, `[data-testid="${id}"] should be visible`).toBeVisible();
    await expect(
      el,
      `[data-testid="${id}"] should be in viewport`
    ).toBeInViewport();
  }
}
