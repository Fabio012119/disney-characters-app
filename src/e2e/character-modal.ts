import { type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";

export default async function CharactersModal(page: Page) {
  await expectVisibleInView(
    page,
    "character-name",
    "close-modal-btn",
    "character-image",
    "character-TV Shows",
    "character-Video Games"
  );

  const closeModalBtn = page.getByTestId("close-modal-btn");
  await closeModalBtn.click();
}
