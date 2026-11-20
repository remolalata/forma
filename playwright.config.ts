import { defineConfig } from "@playwright/test";

const localPreviewUrl = "http://127.0.0.1:4173";
const externalPreviewUrl = process.env.PREVIEW_URL;

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  use: {
    browserName: "chromium",
    baseURL: externalPreviewUrl || localPreviewUrl,
  },
  webServer: externalPreviewUrl
    ? undefined
    : {
        command: "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
        url: localPreviewUrl,
        reuseExistingServer: false,
        timeout: 60_000,
      },
});
