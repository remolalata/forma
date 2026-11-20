import { test, expect } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

for (const viewport of viewports) {
  test(`Capture ${viewport.name} screenshot`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });

    // Wait for the React application to render.
    await expect(page.locator("#root")).not.toBeEmpty({
      timeout: 15000,
    });

    await page.screenshot({
      path: `screenshots/${viewport.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}
