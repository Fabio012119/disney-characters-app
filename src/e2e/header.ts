import { type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";
import Login from "./login";

export default async function Header(page: Page) {
  await expectVisibleInView(
    page,
    "disney-image-desktop",
    "username-text-desktop",
    "log-out-btn-desktop"
  );
  const logOutBtn = page.getByTestId("log-out-btn-desktop");

  await logOutBtn.click();
  await Login(page, false);
}
