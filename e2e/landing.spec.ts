import { expect, test } from "@playwright/test";

test("keyword landing: H1, first-screen tool, sections, sibling pages", async ({
  page,
}) => {
  await page.goto("/");
  // H1 is the target keyword (src/config/landing.ts).
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "AI image generator",
  );
  // Signed-out nav: Sign in + Get started.
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Get started" }),
  ).toHaveAttribute("href", "/signup");
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Sign in" }),
  ).toBeVisible();
  // The working prompt box is in the first screen and posts to /generate.
  const box = page.locator('form[action="/generate"]');
  await expect(box).toBeVisible();
  await expect(box.locator('textarea[name="prompt"]')).toBeVisible();
  await expect(page.locator("#how-it-works")).toBeVisible();
  await expect(page.locator("#use-cases")).toBeVisible();
  // Pricing reads from config/plans.ts, including the credit packs.
  await expect(page.locator("#pricing")).toContainText("$9/mo");
  await expect(page.locator("#pricing")).toContainText("$39");
  await expect(page.locator("#faq details").first()).toBeVisible();
  // Sibling long-tail pages are linked and render their own H1.
  await page.locator('#more-tools a[href="/tools/ai-logo-generator"]').click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "AI logo generator",
  );
});

test("a landing prompt survives the sign-in redirect", async ({ page }) => {
  await page.goto("/");
  await page.locator('textarea[name="prompt"]').fill("Watercolor fox");
  await page.locator('form[action="/generate"] button[type="submit"]').click();
  await expect(page).toHaveURL(/\/login\?next=%2Fgenerate%3Fprompt%3DWatercolor/);
});

test("theme toggle flips to dark, renders, and persists across reloads", async ({
  page,
}) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(html).toHaveClass(/dark/);
  // Dark theme actually renders the page (not just a class flip).
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.reload();
  await expect(html).toHaveClass(/dark/);
});
