// Chụp MỘT phần của trang để kiểm bằng mắt, tiết kiệm token (không chụp cả trang).
// Dùng: node scripts/shot.mjs <id-phần> [rộng ...] [--url=http://localhost:3000/] [--reduced] [--full]
//   node scripts/shot.mjs hero               -> qa-output/shots/hero-1280.png
//   node scripts/shot.mjs lo-trinh 375 1440  -> hai ảnh
//   --reduced: bật prefers-reduced-motion   --full: chụp cả trang (chỉ khi thật cần)
// Phần được tìm theo [data-section="<id>"] (quy ước trong skill sophie-section).
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { gpuLaunchOptions } from "/root/.local/lib/gpu-browser/gpu-browser.mjs";

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith("--") && !/^\d+$/.test(a));
if (!id) {
  console.error("Dùng: node scripts/shot.mjs <id-phần> [rộng ...] [--url=...] [--reduced] [--full]");
  process.exit(2);
}
const widths = args.filter((a) => /^\d+$/.test(a)).map(Number);
const url = args.find((a) => a.startsWith("--url="))?.slice(6) ?? "http://localhost:3000/";
const reduced = args.includes("--reduced");
const full = args.includes("--full");
const outDir = "qa-output/shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch(gpuLaunchOptions());
let failed = false;
try {
  for (const width of widths.length ? widths : [1280]) {
    const height = width < 768 ? 812 : 900;
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    await page.goto(url, { waitUntil: "networkidle" });
    const file = `${outDir}/${id}-${width}${reduced ? "-reduced" : ""}.png`;
    if (full) {
      await page.screenshot({ path: file, fullPage: true });
    } else {
      const el = page.locator(`[data-section="${id}"]`).first();
      if (!(await el.count())) {
        console.error(`Không thấy [data-section="${id}"] ở ${url}`);
        failed = true;
        await page.close();
        continue;
      }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200); // chờ animation T1 xong
      await el.screenshot({ path: file });
    }
    console.log(file);
    await page.close();
  }
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
