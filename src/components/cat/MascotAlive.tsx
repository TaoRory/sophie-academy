"use client";

import { useMemo, useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/motion";
import { LOGO_CAT_D, LOGO_CAT_STROKE, LOGO_CAT_TRANSFORM, LOGO_EYE_D } from "./logoCatPaths";

/**
 * Mèo Sophie GỐC (đúng path trong logo) ngồi yên nhưng "sống": vẫy đuôi, chớp mắt. Hình không đổi.
 *
 * Cách làm: mèo và chữ S (đuôi) là MỘT path liền. Thay vì cắt rời rồi quay cứng (sẽ hở ở chỗ nối), ta UỐN path:
 * mỗi điểm (và điểm điều khiển Bézier) được xoay quanh gốc đuôi một góc nhỏ tỷ lệ với độ cao của nó so với gốc đuôi
 * và với việc nó nằm ở phía đuôi (x lớn). Gốc đuôi và thân mèo (trọng số 0) đứng yên, đuôi càng lên cao càng lệch,
 * nên đuôi luôn dính liền vào thân, không có mối nối. Góc = 0 thì ra đúng hình logo.
 *
 * - Chạy nhịp nhẹ (vẫy 4 nhịp rồi nghỉ ~4s), dừng khi khuất màn hình.
 * - Rê chuột (chuột thật): vẫy mạnh hơn. Giảm chuyển động / không JS: đứng yên (hình gốc).
 */
const VIEWBOX = "170 362 246 214";
const ASPECT = 246 / 214;
const ROOT = { x: 306, y: 549 }; // gốc đuôi, sát đất
const TAIL_H = 180; // chiều cao (đơn vị logo) mà tại đó đuôi uốn đủ góc

type Seg = { cmd: string; p: number[] };

/** Phân tích path (chỉ M, C, L), đổi sang toạ độ viewBox bằng ma trận của logo. */
function parseBase(): Seg[] {
  const m = /matrix\(([^)]+)\)/.exec(LOGO_CAT_TRANSFORM)!;
  const [a, b, c, d, e, f] = m[1].split(",").map(Number);
  const segs: Seg[] = [];
  for (const part of LOGO_CAT_D.match(/[MCLZ][^MCLZ]*/g) ?? []) {
    const cmd = part[0];
    const nums = (part.slice(1).match(/-?\d*\.?\d+(?:e-?\d+)?/g) ?? []).map(Number);
    const p: number[] = [];
    for (let i = 0; i + 1 < nums.length; i += 2) p.push(a * nums[i] + c * nums[i + 1] + e, b * nums[i] + d * nums[i + 1] + f);
    segs.push({ cmd, p });
  }
  return segs;
}

const smooth = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

/** Trọng số uốn: 0 ở thân và gốc đuôi, tăng dần lên phía ngọn đuôi (x lớn, y nhỏ). */
function weight(x: number, y: number) {
  const side = smooth((x - 294) / 24);
  const h = Math.min(1, Math.max(0, (ROOT.y - y) / TAIL_H));
  return side * Math.pow(h, 1.25);
}

function buildD(base: Seg[], deg: number) {
  const k = (deg * Math.PI) / 180;
  let out = "";
  for (const s of base) {
    if (s.cmd === "Z") {
      out += "Z ";
      continue;
    }
    out += s.cmd;
    for (let i = 0; i < s.p.length; i += 2) {
      const x = s.p[i];
      const y = s.p[i + 1];
      const th = k * weight(x, y);
      const dx = x - ROOT.x;
      const dy = y - ROOT.y;
      const c = Math.cos(th);
      const sn = Math.sin(th);
      out += ` ${(ROOT.x + dx * c - dy * sn).toFixed(2)} ${(ROOT.y + dx * sn + dy * c).toFixed(2)}`;
    }
    out += " ";
  }
  return out.trim();
}

export function MascotAlive({ height = 96, className, wag = true }: { height?: number; className?: string; wag?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const base = useMemo(() => parseBase(), []);
  const restD = useMemo(() => buildD(base, 0), [base]);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || !wag) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const body = svg.querySelector<SVGPathElement>('[data-part="body"]')!;
        const eye = svg.querySelector<SVGPathElement>('[data-part="eye"]')!;
        gsap.set(eye, { svgOrigin: "233 394" });

        const sway = { a: 0 };
        const apply = () => body.setAttribute("d", buildD(base, sway.a));

        const blink = () => gsap.timeline().to(eye, { scaleY: 0.1, duration: 0.07 }).to(eye, { scaleY: 1, duration: 0.09 });
        const beats = (amp: number, n: number, d: number) => {
          const tl = gsap.timeline({ onUpdate: apply });
          for (let i = 0; i < n; i++) tl.to(sway, { a: i % 2 ? -amp : amp, duration: d, ease: "sine.inOut" });
          return tl.to(sway, { a: 0, duration: d * 1.4, ease: "sine.out" });
        };

        // Nhịp nền: vẫy nhẹ rồi nghỉ (không chạy liên tục)
        const idle = gsap.timeline({ repeat: -1, repeatDelay: 3.6, delay: 1.5 });
        idle.add(beats(7, 4, 0.34)).add(blink(), 0.5);

        // Rê chuột: vẫy mạnh, nhanh
        let excited: gsap.core.Timeline | null = null;
        const onEnter = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" || !window.matchMedia(MQ.fineHover).matches || excited?.isActive()) return;
          idle.pause();
          excited = gsap
            .timeline({ onComplete: () => void idle.resume() })
            .add(beats(11, 6, 0.19))
            .add(blink(), 0.2);
        };
        svg.addEventListener("pointerenter", onEnter);

        // Khuất màn hình thì dừng
        const st = ScrollTrigger.create({
          trigger: svg,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (excited?.isActive()) return;
            if (self.isActive) idle.resume();
            else idle.pause();
          },
        });

        return () => {
          svg.removeEventListener("pointerenter", onEnter);
          st.kill();
          idle.kill();
          excited?.kill();
          body.setAttribute("d", restD);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [wag] },
  );

  return (
    <svg ref={ref} viewBox={VIEWBOX} width={Math.round(height * ASPECT)} height={height} className={className} style={{ overflow: "visible" }} aria-hidden="true" focusable="false">
      <path data-part="body" d={restD} fill="#F28F20" stroke="#F28F20" strokeWidth={LOGO_CAT_STROKE} strokeLinejoin="miter" />
      <path data-part="eye" d={LOGO_EYE_D} fill="#232A60" />
    </svg>
  );
}
