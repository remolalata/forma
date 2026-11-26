import { defineConfig } from "@playwright/test";

const masterUrl =
  process.env.MASTER_URL || "https://forma-mu-beige.vercel.app/";
const prUrl =
  process.env.PR_URL ||
  process.env.PREVIEW_URL ||
  "https://forma-git-dev-remo-antonio-lalatas-projects.vercel.app/";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  use: {
    browserName: "chromium",
  },
  projects: [
    { name: "master", use: { baseURL: masterUrl } },
    {
      name: "pr",
      use: { baseURL: prUrl },
    },
  ],
});
