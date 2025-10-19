import { expect, type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";

export default async function Login(page: Page, skipLogin: boolean) {
  const userNameInput = page.getByTestId("login-username");
  const passwordInput = page.getByTestId("login-password");
  const logInBtn = page.getByTestId("log-in-btn");

  await expectVisibleInView(
    page,
    "disney-image-desktop",
    "login-form",
    "login-username",
    "login-password",
    "log-in-btn"
  );
  await userNameInput.fill("xxxxx");
  await passwordInput.fill("xxxxx");
  await logInBtn.click();
  const error = page.getByTestId("login-error");
  await expect(error).toBeVisible();
  await expect(error).toBeInViewport();

  if (!skipLogin) {
    await userNameInput.fill("disney");
    await passwordInput.fill("disney123");

    await logInBtn.click();
  }
}
