import { test, expect, type Page } from "@playwright/test";

// Audit computed text/background pairs on solid surfaces. Photography and
// gradients are reviewed visually; they cannot be measured from CSS alone.
async function contrastFailures(page: Page, selector = "body") {
  return page.locator(selector).evaluateAll(roots => {
    const rgba = (value: string) => (value.match(/[\d.]+/g) || []).map(Number);
    const blend = (fg: number[], bg: number[]) => {
      const a = fg[3] ?? 1;
      return [0, 1, 2].map(i => fg[i] * a + bg[i] * (1 - a));
    };
    const luminance = (c: number[]) => c.slice(0, 3).map(v => {
      v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
    }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const failures: string[] = [];
    for (const root of roots) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent?.trim()) continue;
        const el = node.parentElement!;
        if (el.closest("svg, style, script, option, [disabled]")) continue;
        const style = getComputedStyle(el);
        if (!el.getClientRects().length || style.visibility === "hidden") continue;
        const layers: number[][] = [];
        let ignore = false;
        for (let p: Element | null = el; p; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (Number(s.opacity) === 0) { ignore = true; break; }
          const color = rgba(s.backgroundColor);
          if (s.backgroundImage !== "none") { ignore = true; break; }
          layers.push(color);
          if ((color[3] ?? 1) === 1) break;
        }
        if (ignore) continue;
        let bg = [255, 255, 255];
        for (const layer of layers.reverse()) bg = blend(layer, bg);
        const fg = blend(rgba(style.color), bg);
        const l1 = luminance(fg), l2 = luminance(bg);
        const ratio = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
        const size = parseFloat(style.fontSize);
        const threshold = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700) ? 3 : 4.5;
        if (ratio < threshold) failures.push(`${el.tagName}.${el.className}: ${node.textContent.trim().slice(0, 60)} (${ratio.toFixed(2)} < ${threshold})`);
      }
    }
    return [...new Set(failures)];
  });
}

test("solid-surface text and button states meet contrast minimums across public pages", async ({ page }) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/about", "/services", "/projects", "/contact", "/blog"]) {
    await page.goto(path);
    expect(await contrastFailures(page), path).toEqual([]);
    for (const button of await page.locator(".btn:not([disabled]), .nav-cta-btn").all()) {
      await button.hover();
      expect(await contrastFailures(page, ".btn:not([disabled]), .nav-cta-btn"), `${path} hovered buttons`).toEqual([]);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle menu" }).click();
  expect(await contrastFailures(page, "#mobile-navigation")).toEqual([]);
});

test("lifecycle stages stay readable and fit desktop and mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services");
  const section = page.locator("#approach");
  await expect(section.getByRole("listitem")).toHaveCount(4);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await section.scrollIntoViewIfNeeded();
    for (const stage of await section.getByRole("listitem").all()) {
      await expect(stage.getByRole("heading")).toBeVisible();
      await expect(stage.locator("p")).toBeVisible();
    }
    expect(await contrastFailures(page, "#approach")).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await section.screenshot({ path: `test-results/lifecycle-${width}.png`, animations: "disabled" });
  }
});
