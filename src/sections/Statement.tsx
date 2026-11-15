"use client";

import { useEffect, useRef, useState } from "react";
import { PenMark } from "@/components/pen/PenMark";
import { statement } from "@/content/home";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/motion";

/**
 * Tuyên ngôn (cảnh T2 #1): câu lớn trên giấy kẻ, từng từ đổi màu từ xám sang mực theo cuộn (không đổi opacity → luôn đọc được),
 * cuối cùng bút khoanh "sửa ngay" và đánh dấu tích. Không ghim.
 */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  // Vị trí cụm "sửa ngay" để đặt vòng bút như một lớp phủ NGOÀI đoạn chữ bị SplitText tách
  // (SplitText dựng lại/khôi phục DOM bằng innerHTML: component React đặt bên trong sẽ mất liên kết).
  const [box, setBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const sec = ref.current;
    const p = sec?.querySelector<HTMLElement>("[data-statement]");
    if (!sec || !p) return;
    const measure = () => {
      const span = sec.querySelector<HTMLElement>(".stmt-circled");
      if (!span) return;
      const a = sec.getBoundingClientRect();
      const r = span.getBoundingClientRect();
      setBox({ left: r.left - a.left, top: r.top - a.top, width: r.width, height: r.height });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(p);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const text = el.querySelector<HTMLElement>("[data-statement]")!;
        const split = SplitText.create(text, { type: "words" });
        gsap.fromTo(
          split.words,
          { color: "#9da2c4" },
          { color: "#ffffff", ease: "none", stagger: 0.1, scrollTrigger: { trigger: text, start: "top 78%", end: "bottom 50%", scrub: true } },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="tuyen-ngon" data-section="tuyen-ngon" className="paper-margin band-navy section relative" style={{ ["--paper-margin" as string]: "max(24px, calc(50% - 560px))", ["--rule-gap" as string]: "56px" }}>
      {box && (
        <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: box.left - 16, top: box.top - 6, width: box.width + 32, height: box.height + 12 }}>
          <PenMark kind="circle" play="inView" inViewStart="top 65%" duration={0.7} preserveAspectRatio="none" strokeWidth={3.5} className="h-full w-full" />
        </div>
      )}
      <div className="wrap max-w-[1040px]">
        <h2 className="sr-only">Lời hứa của Sophie</h2>
        <p data-statement className="text-[clamp(1.75rem,1rem+2.8vw,3.25rem)] font-extrabold leading-[1.25] text-white" style={{ fontFamily: "var(--font-display)" }}>
          {statement.lead}{" "}
          <span className="stmt-circled whitespace-nowrap">{statement.circled}</span>{" "}
          {statement.tail}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <PenMark kind="tick" play="inView" delay={0.2} strokeWidth={4} className="h-9 w-11" />
          <p className="font-hand text-2xl text-[var(--brand)]">{statement.note}</p>
        </div>
      </div>
    </section>
  );
}
