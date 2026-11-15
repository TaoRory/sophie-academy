// Kiểm tra chất lượng chuyển động + khả năng đọc cho MỌI website (không phụ thuộc dự án).
// Cần: npm i -D playwright  (và `npx playwright install chromium` lần đầu)
// Chạy trên bản build production:  node site-qa.mjs http://localhost:3000 / dich-vu lien-he
//
// Mỗi trang được kiểm ở máy tính và điện thoại:
//   - trả 200, không lỗi console, không tràn ngang, đúng một <h1>
//   - chữ không bị ẩn lúc vừa tải (opacity < 1 hoặc visibility: hidden), trừ phần trang trí aria-hidden
//   - tương phản chữ đạt WCAG AA (4.5:1; chữ lớn 3:1)
// Riêng máy tính:
//   - giảm chuyển động và tắt JavaScript: tiêu đề vẫn hiện
//   - nhịp khung hình khi cuộn (chỉ báo cáo; cảnh báo khi p95 > 25ms)
import { chromium, devices } from "playwright";
// Sophie: vẽ bằng GPU RTX 4070 theo ~/.claude/CLAUDE.md (BROWSER_GPU=0 để quay về SwiftShader khi nghi lỗi GPU)
import { gpuLaunchOptions } from "/root/.local/lib/gpu-browser/gpu-browser.mjs";

const [base, ...rest] = process.argv.slice(2);
if (!base) {
  console.error("Dùng: node site-qa.mjs <baseUrl> [đường dẫn ...]");
  process.exit(2);
}
// Đường dẫn: "/dich-vu", "dich-vu" hoặc URL đầy đủ đều được. Git Bash trên Windows tự đổi "/dich-vu" thành
// "C:/Program Files/Git/dich-vu": nhận diện và bỏ phần đó (hoặc chạy bằng PowerShell / đặt MSYS_NO_PATHCONV=1).
const toPath = (value) => {
  if (/^https?:\/\//.test(value)) return new URL(value).pathname;
  const mangled = value.match(/^[A-Za-z]:[\/].*?[\/]Git[\/]?(.*)$/);
  return "/" + (mangled ? mangled[1] : value).replace(/^\/+/, "");
};
const paths = (rest.length ? rest : ["/"]).map(toPath);
const results = [];
const check = (name, ok, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
};
const note = (text) => console.log(`  · ${text}`);

/** Chạy trong trang: chữ bị ẩn lúc tải + tương phản thấp */
const audit = () => {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = "1"] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r, g, b, a };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const over = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
  const bgOf = (el) => {
    const stack = [];
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) {
        stack.push(c);
        if (c.a === 1) break;
      }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (const c of stack.reverse()) bg = over(c, bg);
    return bg;
  };
  const hidden = [];
  const contrast = [];
  for (const el of document.querySelectorAll("main *, header *, footer *")) {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
    if (el.closest("[aria-hidden='true'], svg, .sr-only, .kit-sr-only, [hidden]")) continue;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height || cs.display === "none") continue;
    const label = el.textContent.trim().slice(0, 28);
    let opacity = 1;
    for (let n = el; n; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
    // Phần tử nằm trong <details> đang đóng hoặc bị cắt hẳn thì bỏ qua
    if (cs.visibility === "hidden" || opacity < 0.99) {
      if (!el.closest("details:not([open])")) hidden.push(label);
      continue;
    }
    const fg0 = parse(cs.color);
    if (!fg0) continue;
    const bg = bgOf(el);
    const fg = over(fg0, bg);
    const ratio = (Math.max(lum(fg), lum(bg)) + 0.05) / (Math.min(lum(fg), lum(bg)) + 0.05);
    const size = parseFloat(cs.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5)) contrast.push(`${label} (${ratio.toFixed(2)})`);
  }
  return {
    hidden,
    contrast,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    h1: document.querySelectorAll("h1").length,
  };
};

const browser = await chromium.launch(gpuLaunchOptions());
try {
const viewports = [
  ["máy tính", { viewport: { width: 1440, height: 900 } }],
  ["điện thoại", { ...devices["iPhone 13"] }],
];

for (const path of paths) {
  for (const [name, options] of viewports) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const response = await page.goto(base + path, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForTimeout(1500);
    const a = await page.evaluate(audit);
    const tag = `[${name}] ${path}`;
    check(`${tag}: trả 200, không lỗi console`, response?.status() === 200 && errors.length === 0, `${response?.status()} ${errors.join(" | ").slice(0, 200)}`);
    check(`${tag}: không tràn ngang, đúng một h1`, a.overflow <= 0 && a.h1 === 1, `tràn ${a.overflow}px, h1=${a.h1}`);
    check(`${tag}: chữ không bị ẩn lúc vừa tải`, a.hidden.length === 0, a.hidden.slice(0, 4).join("; "));
    check(`${tag}: tương phản chữ đạt AA`, a.contrast.length === 0, a.contrast.slice(0, 4).join("; "));

    if (name === "máy tính") {
      // Nhịp khung hình khi cuộn bằng bánh xe (như người dùng)
      await page.mouse.move(700, 450);
      await page.evaluate(() => {
        window.__frames = [];
        let last = performance.now();
        const tick = (now) => {
          window.__frames.push(now - last);
          last = now;
          window.__raf = requestAnimationFrame(tick);
        };
        window.__raf = requestAnimationFrame(tick);
      });
      for (let i = 0; i < 60; i++) {
        await page.mouse.wheel(0, 180);
        await page.waitForTimeout(40);
      }
      const frames = await page.evaluate(() => {
        cancelAnimationFrame(window.__raf);
        return window.__frames.slice(2).sort((x, y) => x - y);
      });
      if (frames.length > 20) {
        const p95 = frames[Math.floor(frames.length * 0.95)];
        const long = frames.filter((f) => f > 50).length;
        note(`${tag}: nhịp khung hình khi cuộn p95 = ${p95.toFixed(1)}ms, ${long} khung dài > 50ms trên ${frames.length} khung${p95 > 25 ? "  ⚠ chậm: xem lại hiệu ứng nặng (blur, WebGL, nhiều ScrollTrigger)" : ""}`);
      }
    }
    await context.close();
  }

  for (const [name, options] of [
    ["giảm chuyển động", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }],
    ["không JS", { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }],
  ]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "load", timeout: 120000 });
    await page.waitForTimeout(800);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll("main :is(h1, h2, h3)")]
        .filter((el) => !el.closest("[aria-hidden='true'], details:not([open])"))
        .filter((el) => {
          let opacity = 1;
          for (let n = el; n; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
          return getComputedStyle(el).visibility === "hidden" || opacity < 0.99;
        })
        .map((el) => el.textContent.trim().slice(0, 28)),
    );
    check(`[${name}] ${path}: mọi tiêu đề vẫn hiện`, bad.length === 0, bad.slice(0, 4).join("; "));
    await context.close();
  }
}

} finally {
  await browser.close();
}
const passed = results.filter(Boolean).length;
console.log(`\n${passed}/${results.length} kiểm tra đạt`);
process.exit(passed === results.length ? 0 : 1);
