import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:4187",
    channel: "msedge",
    screenshot: "only-on-failure",
  },
  webServer: {
    command:
      "npm run dev --prefix client -- --host 127.0.0.1 --port 4187 --strictPort",
    url: "http://127.0.0.1:4187",
    reuseExistingServer: process.env.TEJERE_REUSE_SERVER === "1",
  },
});
