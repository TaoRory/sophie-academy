"use client";

import { useRef, useState } from "react";
import { PenMark } from "@/components/pen/PenMark";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { mistakes } from "@/content/mistakes";
import { gsap, MQ, useGSAP } from "@/lib/motion";

/**
 * Vật thể tương tác (T3): người xem thử làm học viên, tìm lỗi trong câu Writing.
 * Đúng: bút gạch từ sai, viết từ đúng, đánh tích. Sai: bút khoanh lỗi thật. Mỗi từ là <button>, kết quả đọc qua aria-live.
 */
export function FixTheMistake() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = step >= mistakes.length;
  const m = mistakes[Math.min(step, mistakes.length - 1)];
  const solved = picked !== null;
  const correct = picked === m.wrong;

  // Vẽ nét bút mỗi khi có lựa chọn mới
  useGSAP(
    () => {
      if (!solved || !ref.current) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        const q = gsap.utils.selector(ref.current);
        const t = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        if (correct) {
          t.fromTo(q(".fm-strike path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.35 })
            .fromTo(q(".fm-fix"), { text: "" }, { text: m.fix, duration: 0.4, ease: "none" })
            .fromTo(q(".fm-tick path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.3 });
        } else {
          t.fromTo(q(".fm-circle path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.55 });
        }
        t.from(q(".fm-why"), { y: 12, duration: 0.35, ease: "power3.out" }, "-=0.1");
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [step, picked] },
  );

  const pick = (i: number) => {
    if (solved) return;
    setPicked(i);
    if (i === m.wrong) setScore((s) => s + 1);
  };
  const next = () => {
    setPicked(null);
    setStep((s) => s + 1);
  };
  const restart = () => {
    setPicked(null);
    setScore(0);
    setStep(0);
  };

  return (
    <section ref={ref} id="tim-loi" data-section="tim-loi" className="section bg-[var(--paper)]">
      <div className="wrap">
        <SectionHeading before="Bạn tìm được" accent="lỗi sai" after="không?" sub="Thử làm học viên của Sophie một phút: bấm vào từ bạn nghĩ là sai." />
        <div className="paper-margin mx-auto mt-10 max-w-[860px] rounded-[var(--r-sheet)] border border-[var(--line)] bg-white px-6 pb-8 pl-[72px] pt-6 sm:px-10 sm:pl-[88px]" style={{ ["--paper-margin" as string]: "48px", ["--rule-gap" as string]: "48px" }}>
          {!done ? (
            <>
              <p className="flex h-12 items-center justify-between text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
                <span>Câu {step + 1}/{mistakes.length} · Writing</span>
                <span>Đúng {score}</span>
              </p>
              <p className="text-[clamp(1.125rem,1rem+0.8vw,1.5rem)] font-semibold leading-[48px]" aria-label="Chọn từ sai trong câu">
                {m.tokens.map((tok, i) => {
                  const isWrong = i === m.wrong;
                  return (
                    <span key={`${step}-${i}`} className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => pick(i)}
                        disabled={solved}
                        aria-pressed={picked === i}
                        className={`rounded-md px-1 transition-colors duration-150 ${solved ? "cursor-default" : "hover:bg-[var(--brand-soft)] focus-visible:bg-[var(--brand-soft)]"} ${picked === i && !correct ? "text-[var(--muted)] line-through decoration-[var(--muted)]" : ""}`}
                      >
                        {tok}
                      </button>
                      {solved && isWrong && correct && (
                        <>
                          <PenMark kind="strike" play="manual" preserveAspectRatio="none" strokeWidth={3} className="fm-strike absolute inset-x-0 top-1/2 h-[12px] w-full -translate-y-1/2" />
                          <span className="fm-fix font-hand absolute -top-[0.9em] left-1/2 -translate-x-1/2 whitespace-nowrap text-[1.2em] leading-none text-[var(--brand-ink)]">{m.fix}</span>
                        </>
                      )}
                      {solved && isWrong && !correct && (
                        <PenMark kind="circle" play="manual" preserveAspectRatio="none" strokeWidth={3} className="fm-circle absolute -inset-x-3 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+24px)]" />
                      )}{" "}
                    </span>
                  );
                })}
              </p>
              <div aria-live="polite" className="min-h-[96px]">
                {solved && (
                  <div className="fm-why mt-2 flex items-start gap-3">
                    {correct ? <PenMark kind="tick" play="manual" strokeWidth={4} className="fm-tick mt-1 h-7 w-9 shrink-0" /> : null}
                    <p className="text-[1.0625rem]">
                      <b>{correct ? "Chính xác! " : `Lỗi nằm ở “${m.tokens[m.wrong]}”. `}</b>
                      {m.why}
                    </p>
                  </div>
                )}
              </div>
              {solved && (
                <button type="button" onClick={next} className="btn btn-ink mt-2">
                  {step + 1 < mistakes.length ? "Câu tiếp theo" : "Xem kết quả"}
                </button>
              )}
            </>
          ) : (
            <div className="py-6" aria-live="polite">
              <p className="font-hand text-3xl text-[var(--brand-ink)]">
                Bạn tìm đúng {score}/{mistakes.length} lỗi
              </p>
              <p className="mt-3 max-w-[52ch] text-lg">Ở Sophie, mỗi buổi học là như vậy: giáo viên chỉ ra đúng lỗi của bạn và giải thích ngay.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaLink className="btn btn-primary">
                  <span className="kit-roll">
                    <span>{site.cta.primary}</span>
                    <span aria-hidden="true">{site.cta.primary}</span>
                  </span>
                </CtaLink>
                <button type="button" onClick={restart} className="btn btn-line">
                  Làm lại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
