"use client";

import { useId, useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/motion";
import { LOGO_CAT_D, LOGO_CAT_STROKE, LOGO_CAT_TRANSFORM, LOGO_EYE_D } from "./logoCatPaths";

/**
 * Mèo Sophie GỐC (đúng path trong logo) ngồi yên nhưng "sống": vẫy đuôi, chớp mắt. Hình không đổi.
 * Cách làm: vẽ cùng một path hai lần, mỗi lần cắt bằng clipPath: lớp THÂN (mèo) đứng yên, lớp ĐUÔI (chữ S) quay quanh gốc đuôi.
 * Hai lớp chồng lên nhau 3px ở chỗ nối nên không hở khi đuôi quay.
 * - Chạy nhịp nhẹ (vẫy 4 nhịp rồi nghỉ ~4s), dừng khi khuất màn hình.
 * - Rê chuột (chuột thật): vẫy mạnh hơn. Giảm chuyển động / không JS: đứng yên.
 */
const VIEWBOX = "170 362 246 214";
const ASPECT = 246 / 214;
const TAIL_PIVOT = "306 549";
const EYE_PIVOT = "233 394";

// Thân: mèo (bỏ chữ S). Đuôi: phần còn lại, cộng một mảnh lấn vào thân CHỈ ở giữa chỗ nối (x 298-309, y 512-543, nằm sâu trong thân)
// để che mối nối khi quay. Lấn ra tới mép lưng mèo thì lúc đuôi quay sẽ lòi một vệt cam ra ngoài hình.
const CAT_CLIP = "M150 340 L 284 340 L 284 468 L 309 503 L 309 551 L 301 551 L 301 600 L 150 600 Z";
// Đường cắt phía trên chạy trong khoảng TRẮNG giữa lưng mèo và chữ S (không cắt vào thân mèo), nên không có điểm ảnh thân nào quay theo đuôi.
const TAIL_CLIP = "M294 330 L 440 330 L 440 610 L 301 610 L 301 551 L 309 551 L 309 543 L 298 543 L 298 512 L 309 512 L 309 503 L 306 495 L 304 480 L 294 468 Z";

export function MascotAlive({ height = 96, className, wag = true }: { height?: number; className?: string; wag?: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || !wag) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const tail = svg.querySelector<SVGGElement>('[data-part="tail"]')!;
        const eye = svg.querySelector<SVGPathElement>('[data-part="eye"]')!;
        gsap.set(tail, { svgOrigin: TAIL_PIVOT });
        gsap.set(eye, { svgOrigin: EYE_PIVOT });

        const blink = () => gsap.timeline().to(eye, { scaleY: 0.1, duration: 0.07 }).to(eye, { scaleY: 1, duration: 0.09 });
        const beats = (amp: number, n: number, d: number) => {
          const tl = gsap.timeline();
          for (let i = 0; i < n; i++) tl.to(tail, { rotation: i % 2 ? -amp : amp, duration: d, ease: "sine.inOut" });
          return tl.to(tail, { rotation: 0, duration: d * 1.4, ease: "sine.out" });
        };

        // Nhịp nền: vẫy nhẹ rồi nghỉ (không chạy liên tục)
        const idle = gsap.timeline({ repeat: -1, repeatDelay: 3.6, delay: 1.5 });
        idle.add(beats(7, 4, 0.3)).add(blink(), 0.5);

        // Rê chuột: vẫy mạnh, nhanh
        let excited: gsap.core.Timeline | null = null;
        const onEnter = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" || !window.matchMedia(MQ.fineHover).matches || excited?.isActive()) return;
          idle.pause();
          excited = gsap
            .timeline({ onComplete: () => void idle.resume() })
            .add(beats(11, 6, 0.17))
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
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [wag] },
  );

  const clipCat = `mc-cat-${uid}`;
  const clipTail = `mc-tail-${uid}`;
  const art = <path d={LOGO_CAT_D} transform={LOGO_CAT_TRANSFORM} fill="#F28F20" stroke="#F28F20" strokeWidth={LOGO_CAT_STROKE} />;

  return (
    <svg
      ref={ref}
      viewBox={VIEWBOX}
      width={Math.round(height * ASPECT)}
      height={height}
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipCat} clipPathUnits="userSpaceOnUse">
          <path d={CAT_CLIP} />
        </clipPath>
        <clipPath id={clipTail} clipPathUnits="userSpaceOnUse">
          <path d={TAIL_CLIP} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipCat})`}>{art}</g>
      <g data-part="tail" clipPath={`url(#${clipTail})`}>
        {art}
      </g>
      <path data-part="eye" d={LOGO_EYE_D} fill="#232A60" />
    </svg>
  );
}
