"use client";

import { useRef } from "react";
import { CAT_FEET_RATIO, CatRig } from "@/components/cat/CatRig";
import { gsap, MQ, useGSAP } from "@/lib/motion";

/**
 * Mèo Sophie đi theo cuộn (spec: .claude/skills/sophie-section/sections/16-meo.md).
 * - Máy tính: đậu trên mép trên của khối có [data-cat-perch="left|right"]; sang khối mới thì nhảy vòng cung tới đó.
 * - Điện thoại: đậu ở hero, qua hero thì ngồi trên thanh CTA đáy [data-cat-perch-mobile], nhảy tại chỗ khi sang phần mới.
 * - Rê chuột (máy tính) hoặc chạm (điện thoại): giơ tay vẫy, vẫy đuôi, bong bóng "Hello!".
 * - Giảm chuyển động / không JS: không chạy; Hero đã có mèo tĩnh (.hero-cat-static).
 * Không có vòng lặp chạy mãi: đuôi đung đưa vài nhịp sau mỗi lần tiếp đất / vẫy rồi đứng yên.
 */

const HEADER = 64;
const EDGE_INSET = 24;

type Pos = { x: number; y: number };

export function CatCompanion() {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktopMotion, mobile: MQ.mobileMotion }, (ctx) => {
      const desktop = Boolean(ctx.conditions?.desktop);
      const root = document.documentElement;
      const flip = layer.querySelector<HTMLElement>(".cat-flip")!;
      const svg = layer.querySelector<SVGSVGElement>("svg")!;
      const part = (n: string) => svg.querySelector<SVGGElement>(`[data-part="${n}"]`)!;
      const tail = part("tail"), arm = part("arm"), head = part("head"), eyes = part("eyes"), bubble = part("bubble"), shadow = part("shadow");

      root.dataset.cat = "on";
      layer.dataset.mode = desktop ? "desktop" : "mobile";
      gsap.set(tail, { svgOrigin: "134 198" });
      gsap.set(arm, { svgOrigin: "80 146" });
      gsap.set(head, { svgOrigin: "100 128" });
      gsap.set(eyes, { svgOrigin: "100 92" });
      gsap.set(bubble, { svgOrigin: "48 -8", scale: 0, opacity: 1 });
      gsap.set(svg, { transformOrigin: "50% 92%" });

      let catW = 0, catH = 0;
      const measure = () => {
        const r = svg.getBoundingClientRect();
        catW = r.width;
        catH = r.height;
      };
      measure();

      const perchList = () => (desktop ? [...document.querySelectorAll<HTMLElement>("[data-cat-perch]")] : []);
      let perches = perchList();
      const heroPerch = document.querySelector<HTMLElement>('[data-section="hero"] [data-cat-perch]');
      const barPerch = document.querySelector<HTMLElement>("[data-cat-perch-mobile]");

      const targetOf = (el: HTMLElement, r = el.getBoundingClientRect()): Pos => {
        const side = el.dataset.catPerch === "left" || el.dataset.catPerchMobile === "left" ? "left" : "right";
        return {
          x: side === "left" ? r.left + EDGE_INSET : r.right - EDGE_INSET - catW,
          y: r.top - catH * (1 - CAT_FEET_RATIO) + 2,
        };
      };

      let current: HTMLElement | null = null;
      let pos: Pos = { x: -999, y: -999 };
      const jump = { t: 0, from: { x: 0, y: 0 } as Pos, height: 140, active: false };
      let jumpTl: gsap.core.Timeline | null = null;
      let waveTl: gsap.core.Timeline | null = null;
      let lastSection: string | null = null;

      const settle = () =>
        gsap
          .timeline()
          .to(tail, { rotation: 10, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 4 })
          .to(eyes, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, 0.5)
          .set(tail, { rotation: 0 });

      const startJump = (to: HTMLElement | null, height: number) => {
        jumpTl?.kill();
        const vw = window.innerWidth, vh = window.innerHeight;
        jump.from = {
          x: gsap.utils.clamp(0, vw - catW, pos.x),
          y: gsap.utils.clamp(HEADER, vh - catH, pos.y < -500 ? vh - catH : pos.y),
        };
        if (to) current = to;
        const dest = current ? targetOf(current) : jump.from;
        const dir = dest.x < jump.from.x - 4 ? -1 : dest.x > jump.from.x + 4 ? 1 : 0;
        jump.height = height;
        jump.t = 0;
        jump.active = true;
        jumpTl = gsap
          .timeline({ onComplete: () => void (jump.active = false) })
          .set(flip, { scaleX: dir === 0 ? 1 : dir })
          .to(svg, { scaleY: 0.84, scaleX: 1.06, duration: 0.12, ease: "power2.out" })
          .addLabel("air")
          .to(jump, { t: 1, duration: 0.62, ease: "none" }, "air")
          .to(svg, { scaleY: 1.08, scaleX: 0.94, duration: 0.2, ease: "power2.out" }, "air")
          .to(tail, { rotation: -32, duration: 0.25, ease: "power2.out" }, "air")
          .to(shadow, { opacity: 0.03, duration: 0.2 }, "air")
          .to(svg, { scaleY: 0.86, scaleX: 1.08, duration: 0.1, ease: "power2.in" }, "air+=0.52")
          .to(shadow, { opacity: 0.12, duration: 0.15 }, "air+=0.5")
          .to(svg, { scaleY: 1, scaleX: 1, duration: 0.4, ease: "power3.out" })
          .to(tail, { rotation: 0, duration: 0.3, ease: "power3.out" }, "<")
          .to(flip, { scaleX: 1, duration: 0.25, ease: "power2.inOut" }, "<0.15")
          .add(settle());
      };

      const wave = () => {
        if (waveTl?.isActive()) return;
        waveTl = gsap
          .timeline()
          .to(arm, { rotation: 118, duration: 0.3, ease: "power3.out" })
          .to(head, { rotation: -8, duration: 0.3, ease: "power3.out" }, 0)
          .to(bubble, { scale: 1, duration: 0.3, ease: "power3.out" }, 0.05)
          .to(arm, { rotation: 98, duration: 0.16, ease: "sine.inOut", yoyo: true, repeat: 5 }, 0.3)
          .to(tail, { rotation: 24, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 7 }, 0.1)
          .to(eyes, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, 0.6)
          .to(bubble, { scale: 0, duration: 0.25, ease: "power3.in" }, 1.45)
          .to([arm, head, tail], { rotation: 0, duration: 0.35, ease: "power3.inOut" }, 1.4);
      };
      const onEnter = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && window.matchMedia(MQ.fineHover).matches) wave();
      };
      const onDown = () => wave();
      svg.addEventListener("pointerenter", onEnter);
      svg.addEventListener("pointerdown", onDown);

      const pickDesktop = (vh: number) => {
        let best: HTMLElement | null = null;
        let bestD = Infinity;
        for (const el of perches) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          if (r.top < HEADER + catH * 0.6 || r.top > vh * 0.85) continue;
          const d = Math.abs(r.top - vh * 0.4);
          if (d < bestD) {
            bestD = d;
            best = el;
          }
        }
        return best;
      };

      const pickMobile = (vh: number) => {
        if (heroPerch) {
          const r = heroPerch.getBoundingClientRect();
          if (r.top > HEADER + catH * 0.4 && r.top < vh * 0.9) return heroPerch;
        }
        if (barPerch) {
          const r = barPerch.getBoundingClientRect();
          if (r.top < vh - 8) return barPerch;
        }
        return null;
      };

      const sectionAtMiddle = (vh: number) => {
        const el = document.elementFromPoint(window.innerWidth / 2, vh / 2)?.closest<HTMLElement>("[data-section]");
        return el?.dataset.section ?? null;
      };

      const tick = () => {
        const vh = window.innerHeight;
        const next = desktop ? pickDesktop(vh) : pickMobile(vh);

        if (next && next !== current) {
          if (!current) {
            current = next; // lần đầu: đặt thẳng, không nhảy
            pos = targetOf(next);
          } else startJump(next, desktop ? 150 : 90);
        } else if (!desktop && current === barPerch && !jump.active) {
          const sec = sectionAtMiddle(vh);
          if (sec && lastSection && sec !== lastSection) startJump(null, 46); // nhảy tại chỗ khi sang phần mới
          lastSection = sec;
        }

        if (current) {
          const dest = targetOf(current);
          if (jump.active) {
            const t = jump.t;
            const e = gsap.parseEase("power1.inOut")(t);
            pos = {
              x: jump.from.x + (dest.x - jump.from.x) * e,
              // đỉnh vòng cung không chui xuống dưới header
              y: Math.max(HEADER + 6, jump.from.y + (dest.y - jump.from.y) * e - Math.sin(Math.PI * t) * jump.height),
            };
          } else pos = dest;
        }
        layer.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
        layer.style.visibility = current ? "visible" : "hidden";
      };

      const onResize = () => {
        measure();
        perches = perchList();
      };
      window.addEventListener("resize", onResize);
      // Đăng ký sau Lenis (MotionProvider gắn ticker trong effect của nó) để đọc vị trí sau khi trang đã cuộn trong khung này
      const raf = requestAnimationFrame(() => gsap.ticker.add(tick));

      return () => {
        cancelAnimationFrame(raf);
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", onResize);
        svg.removeEventListener("pointerenter", onEnter);
        svg.removeEventListener("pointerdown", onDown);
        jumpTl?.kill();
        waveTl?.kill();
        delete root.dataset.cat;
        layer.style.visibility = "hidden";
      };
    });

    return () => mm.revert();
  });

  return (
    <div ref={layerRef} className="cat-companion" aria-hidden="true">
      <div className="cat-flip">
        <CatRig size={110} />
      </div>
    </div>
  );
}
