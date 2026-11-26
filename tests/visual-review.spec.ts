import { test, expect } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

for (const viewport of viewports) {
  test(`Capture ${viewport.name} screenshot`, async ({ page }, testInfo) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });

    // Confirm the homepage rendered rather than capturing a login or error page.
    await expect(page.locator("#hero-title")).toBeVisible({
      timeout: 15000,
    });

    // Full-page captures must also include images outside the viewport.
    await page.locator("img").evaluateAll((images) => {
      for (const image of images) image.setAttribute("loading", "eager");
    });
    for (const image of await page.locator("img").all()) {
      await expect(image).toHaveJSProperty("complete", true, {
        timeout: 15000,
      });
      await expect(image).not.toHaveJSProperty("naturalWidth", 0);
    }

    await page.screenshot({
      path: `screenshots/${testInfo.project.name}/${viewport.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}
