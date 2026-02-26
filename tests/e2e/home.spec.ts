import { expect, test } from "@playwright/test";

test("home renders main sections and contact form", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "함께 예배하고",
  );
  await expect(page.getByRole("heading", { name: "우리의 예배 히스토리" })).toBeVisible();
  await expect(page.getByLabel("이름")).toBeVisible();
  await expect(page.getByLabel("이메일")).toBeVisible();
  await expect(page.getByLabel("메시지")).toBeVisible();
});

test("client validation blocks invalid email", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("이름").fill("테스터");
  const emailInput = page.getByLabel("이메일");
  await emailInput.fill("not-an-email");
  await page.getByRole("button", { name: "함께하기 문의 보내기" }).click();

  const isValid = await emailInput.evaluate((input) => {
    return (input as HTMLInputElement).checkValidity();
  });
  expect(isValid).toBeFalsy();
});
