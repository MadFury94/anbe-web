import { test, expect } from "@playwright/test";

test("all public pages use Tejere content without backend calls", async ({
  page,
}) => {
  const failures: string[] = [];
  const backendCalls: string[] = [];
  page.on("pageerror", (e) => failures.push(e.message));
  page.on("request", (r) => {
    if (/anbe-api|\/api\/|emailjs/.test(r.url())) backendCalls.push(r.url());
  });
  for (const path of [
    "/",
    "/about",
    "/services",
    "/projects",
    "/contact",
    "/blog",
  ]) {
    await page.goto(path);
    await expect(page).toHaveTitle(/Tejere Anderson Services/);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(
      /ANBE|Ernest Azukaeme|1990|140\+|anbenig/i,
    );
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
    }
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter(
            (image) =>
              !(image as HTMLImageElement).complete ||
              (image as HTMLImageElement).naturalWidth === 0,
          )
          .map((image) => image.getAttribute("src")),
      );
    expect(broken).toEqual([]);
  }
  expect(failures).toEqual([]);
  expect(backendCalls).toEqual([]);
});

test("terrain tabs support keyboard navigation and enquiries stay disabled", async ({
  page,
}) => {
  await page.goto("/services");
  await page.getByRole("tab", { name: /Onshore/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Swamp/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Seasonal access");
  await page.getByRole("tab", { name: /Creek/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("jetties");
  await page.getByRole("tab", { name: /Deep offshore/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("shore-side community relations");
  await page.goto("/contact");
  await expect(
    page.getByRole("button", { name: /Send enquiry/ }),
  ).toBeDisabled();
  await expect(page.locator("#contact-note")).toContainText(
    "Nothing entered here is sent or saved",
  );
  await expect(page.locator(".contact-info")).toContainText("***");
});

test("updated home presents the concept content and supplied photography", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Upstream, built with the community.");
  await expect(page.locator("video")).toHaveCount(0);
  await page.getByRole("button", { name: "Explore seismic survey" }).click();
  await expect(page.locator("#field-readout")).toContainText("surveying the ground");
  await page.getByRole("button", { name: "Explore exploration well" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#field-readout")).toContainText("Wells are where plans meet reality");
  await page.getByRole("group", { name: "Field stages" }).getByRole("button", { name: /Production/ }).click();
  await expect(page.locator("#field-readout")).toContainText("reviewed regularly and reported openly");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".field-note span")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".field-flow")).toHaveCSS("animation-name", "none");
  await expect(page.locator("#services")).toContainText("Exploration support");
  await expect(page.locator("body")).not.toContainText(/demo|Steel plus consent/i);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo({top: 0, behavior: "instant"}));
    await page.screenshot({ path: `test-results/tejere-hero-${width}.png`, animations: "disabled" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});

test("mobile menu, navigation and layout work at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Toggle menu" });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("h1")).toContainText("Protecting operations");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  for (const section of await page.locator(".reveal").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "test-results/tejere-mobile.png",
    fullPage: true,
  });
});

test("removed admin, report and article routes do not expose legacy pages", async ({
  page,
}) => {
  for (const path of ["/admin", "/report/example", "/blog/legacy-article"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveText("This page is not available.");
  }
});
