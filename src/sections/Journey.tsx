"use client";

import { useEffect, useRef, useState } from "react";
import { PenMark } from "@/components/pen/PenMark";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roadmapSteps } from "@/content/roadmap";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/motion";

/** Đường cong mềm đi qua các điểm (Catmull-Rom → Bézier), lệch nhẹ như nét tay. */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const wob = i % 2 ? 14 : -14; // lệch tay
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 + wob };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 + wob };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * Hành trình 5 bước (cảnh T2 #2): nét bút cam nối tâm các vòng số, vẽ dần theo cuộn; nét tới bước nào thì bước đó được tích.
 * Máy tính: hàng ngang; điện thoại: cột dọc. Không ghim. Không JS / giảm chuyển động: nét và tích vẽ sẵn.
 */
export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const [geo, setGeo] = useState({ w: 0, h: 0, d: "" });

  // Đo tâm các vòng số để dựng đường (đổi khi đổi kích thước)
  useEffect(() => {
    const ol = listRef.current;
    if (!ol) return;
    const measure = () => {
      const box = ol.getBoundingClientRect();
      const pts = [...ol.querySelectorAll<HTMLElement>("[data-step-dot]")].map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      setGeo({ w: box.width, h: box.height, d: smoothPath(pts) });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const ol = listRef.current;
      if (!ol || !geo.d) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const line = ol.querySelector<SVGPathElement>("[data-journey-line]")!;
        const ticks = [...ol.querySelectorAll<SVGSVGElement>("[data-step-tick]")].map((svg) =>
          gsap.fromTo(svg.querySelectorAll("path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.3, ease: "power2.out", paused: true }),
        );
        gsap.fromTo(line, { drawSVG: "0%" }, {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ol,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
            onUpdate: (self) => {
              const n = ticks.length;
              ticks.forEach((tw, i) => {
                const reached = self.progress >= (n === 1 ? 0 : i / (n - 1)) - 0.001;
                if (reached && tw.progress() < 1 && !tw.isActive()) tw.play();
                if (!reached && tw.progress() > 0 && !tw.reversed()) tw.reverse();
              });
            },
          },
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { dependencies: [geo.d], scope: listRef },
  );

  return (
    <section id="lo-trinh" data-section="lo-trinh" className="section bg-[var(--paper)]">
      <div className="wrap">
        <SectionHeading before="Hành trình" accent="cùng Sophie" sub="Từ buổi kiểm tra đầu vào tới ngày đi thi, mỗi bước đều có giáo viên đi cùng." />
        <ol ref={listRef} className="relative mt-12 grid gap-4 lg:grid-cols-5">
          {geo.d && (
            <svg aria-hidden="true" className="pen-mark pen-wait pointer-events-none absolute inset-0 z-[5]" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
              <path data-journey-line d={geo.d} strokeWidth={3.5} />
            </svg>
          )}
          {roadmapSteps.map((s, i) => (
            <li key={s.title} className="card-lift relative flex gap-4 rounded-[var(--r-card)] border border-[var(--line)] bg-white/90 p-5 lg:block lg:text-center">
              <span className="relative z-10 shrink-0 lg:mx-auto lg:block lg:w-fit">
                <span data-step-dot className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--ink)] text-xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {i + 1}
                </span>
                <span data-step-tick className="absolute -right-5 -top-3 block h-7 w-8">
                  <PenMark kind="tick" play="manual" strokeWidth={4.5} className="h-full w-full" />
                </span>
              </span>
              <span className="block">
                <h3 className="text-xl leading-tight lg:mt-3">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-[var(--muted)]">{s.body}</p>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
