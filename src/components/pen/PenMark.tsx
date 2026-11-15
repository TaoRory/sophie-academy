"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/motion";
import { PEN, type PenKind } from "./penPaths";

/**
 * Nét bút của giáo viên (chữ ký "Bút sửa bài"). Trang trí: aria-hidden.
 * play:
 *  - "inView" (mặc định): tự vẽ một lần khi vào màn hình
 *  - "scrub": vẽ theo cuộn (scrubStart/scrubEnd theo cú pháp ScrollTrigger, trigger = chính nét hoặc `trigger`)
 *  - "manual": không tự chạy; cha vẽ bằng gsap (chọn `.pen-mark path`). Vẫn bắt đầu ẩn khi có chuyển động.
 *  - "static": vẽ sẵn
 * Không JS / giảm chuyển động: nét vẽ sẵn (CSS chỉ ẩn dưới html[data-motion="on"]).
 */
export function PenMark({
  kind,
  play = "inView",
  delay = 0,
  duration = 0.6,
  strokeWidth = 3,
  color,
  className,
  style,
  preserveAspectRatio,
  scrubStart = "top 80%",
  scrubEnd = "top 45%",
  inViewStart = "top 88%",
  trigger,
}: {
  kind: PenKind;
  play?: "inView" | "scrub" | "manual" | "static";
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  preserveAspectRatio?: string;
  scrubStart?: string;
  scrubEnd?: string;
  /** điểm bắt đầu vẽ với play="inView" (cú pháp ScrollTrigger) */
  inViewStart?: string;
  trigger?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const spec = PEN[kind];

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || play === "static" || play === "manual") return;
      const paths = svg.querySelectorAll("path");
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const trig = (trigger && document.querySelector(trigger)) || svg;
        if (play === "scrub") {
          gsap.fromTo(paths, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", stagger: 0.3, scrollTrigger: { trigger: trig, start: scrubStart, end: scrubEnd, scrub: true } });
        } else {
          gsap.fromTo(paths, { drawSVG: "0%" }, { drawSVG: "100%", duration, delay, ease: "power2.inOut", stagger: duration * 0.6, scrollTrigger: { trigger: trig, start: inViewStart, once: true } });
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox={spec.vb}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio={preserveAspectRatio}
      className={`pen-mark ${play === "static" ? "" : "pen-wait"} ${className ?? ""}`}
      style={{ ...(color ? ({ "--pen": color } as React.CSSProperties) : {}), ...style }}
    >
      {spec.d.map((d) => (
        <path key={d} d={d} strokeWidth={strokeWidth} vectorEffect={preserveAspectRatio === "none" ? "non-scaling-stroke" : undefined} />
      ))}
    </svg>
  );
}
