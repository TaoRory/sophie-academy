"use client";

import { useRef } from "react";
import { Mascot } from "@/components/ui/Mascot";
import { gsap, MQ, useGSAP } from "@/lib/motion";
import { PenMark } from "./PenMark";

/**
 * Chữ ký ở hero: tờ bài Writing được giáo viên sửa trực tiếp (minh họa).
 * Chạy một lần sau khi tiêu đề hiện (~3s), có nút "Xem lại". Không JS / giảm chuyển động: hiện sẵn bản đã sửa.
 * Cả tờ là một hình minh họa: role="img" + aria-label; nội dung bên trong aria-hidden.
 */
function Fix({ wrong, right, id }: { wrong: string; right: string; id: string }) {
  return (
    <span className="relative inline-block" data-fix={id}>
      <span className="relative">
        {wrong}
        <PenMark kind="strike" play="manual" preserveAspectRatio="none" strokeWidth={2.5} className="absolute inset-x-[-3px] top-1/2 h-[10px] w-[calc(100%+6px)] -translate-y-1/2" />
      </span>
      <span className="lc-fix font-hand absolute -top-[0.95em] left-1/2 -translate-x-1/2 whitespace-nowrap text-[1.15em] leading-none text-[var(--brand-ink)]" data-text={right}>
        {right}
      </span>
    </span>
  );
}

export function LiveCorrection({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const q = gsap.utils.selector(root);
        const t = gsap.timeline({ delay: 1.1, defaults: { ease: "power2.inOut" } });
        for (const id of ["a", "b"]) {
          const fix = q(`[data-fix="${id}"] .lc-fix`)[0] as HTMLElement;
          t.fromTo(q(`[data-fix="${id}"] .pen-mark path`), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.35 })
            .set(fix, { visibility: "visible" })
            .fromTo(fix, { text: "" }, { text: fix.dataset.text ?? "", duration: 0.45, ease: "none" })
            .to({}, { duration: 0.15 });
        }
        t.fromTo(q("[data-lc='circle'] path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6 })
          .fromTo(q("[data-lc='arrow'] path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.35, stagger: 0.25 })
          .set(q(".lc-note"), { visibility: "visible" })
          .fromTo(q(".lc-note"), { text: "" }, { text: "Nêu rõ lý do nhé", duration: 0.5, ease: "none" })
          .fromTo(q("[data-lc='tick'] path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.3 }, "+=0.1")
          .set(q(".lc-sign"), { visibility: "visible" })
          .fromTo(q(".lc-sign"), { text: "" }, { text: "Sửa ngay trong buổi học", duration: 0.6, ease: "none" });
        tl.current = t;
        return () => {
          tl.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  // restart() không tạo tween mới nên không cần contextSafe
  const replay = () => tl.current?.restart();

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <Mascot height={96} className="absolute bottom-[calc(100%-4px)] right-5" />
      <div role="img" aria-label="Minh họa: giáo viên sửa bài Writing trực tiếp trong buổi học" className="paper-margin relative rounded-[var(--r-card)] border border-[var(--line)] bg-white pb-4 pl-[56px] pr-5 pt-4 text-left" style={{ ["--paper-margin" as string]: "40px", ["--rule-gap" as string]: "40px" }}>
        <div aria-hidden="true">
          <p className="flex h-10 items-center text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Writing Task 2 · Minh họa</p>
          <p className="text-[0.9375rem] leading-[40px] text-[var(--ink)]">
            Nowadays, many people <Fix id="a" wrong="believes" right="believe" /> that working from home <Fix id="b" wrong="make" right="makes" /> employees more productive, but I{" "}
            <span className="relative inline-block whitespace-nowrap">
              partly disagree
              <span data-lc="circle" className="absolute -inset-x-3 -inset-y-1">
                <PenMark kind="circle" play="manual" strokeWidth={2.5} preserveAspectRatio="none" className="h-full w-full" />
              </span>
            </span>
            .
          </p>
          <div className="relative flex h-10 items-center justify-end gap-2">
            <span data-lc="arrow" className="block h-7 w-11 -scale-y-100">
              <PenMark kind="arrow" play="manual" strokeWidth={2.5} className="h-full w-full -scale-x-100" />
            </span>
            <span className="lc-note font-hand text-lg text-[var(--brand-ink)]">Nêu rõ lý do nhé</span>
          </div>
          <div className="flex h-10 items-center gap-2">
            <span data-lc="tick" className="block h-6 w-7">
              <PenMark kind="tick" play="manual" strokeWidth={4} className="h-full w-full" />
            </span>
            <span className="lc-sign font-hand text-lg text-[var(--brand-ink)]">Sửa ngay trong buổi học</span>
          </div>
        </div>
      </div>
      <button type="button" onClick={replay} className="lc-replay absolute -bottom-4 left-5 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-bold text-[var(--ink)] hover:border-[var(--brand)]">
        Xem lại
      </button>
    </div>
  );
}
