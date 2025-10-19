import { expect, test } from "@playwright/test";
import Login from "./login";
import Header from "./header";
import SideBar from "./sideBar";
import CharactersTable from "./charactersTable";
import PieChart from "./pie-charts";

test("Test the flow of the app", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/login");

  await test.step("Testing login...", async () => {
    await Login(page, false);
  });

  await test.step("Testing header, logging out and in again ...", async () => {
    await Header(page);
  });

  await test.step("Testing side bar...", async () => {
    await SideBar(page);
  });

  await test.step("Testing characters Table..", async () => {
    await CharactersTable(page);
  });

  await test.step("Testing pie chart..", async () => {
    await PieChart(page);
  });

  const logOutBtn = page.getByTestId("log-out-btn-desktop");

  await logOutBtn.click();

  await Login(page, true);
});
