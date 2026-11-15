import { Magnetic } from "@/components/motion/Magnetic";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Tilt } from "@/components/motion/Tilt";
import { CatRig } from "@/components/cat/CatRig";
import { ZaloLink } from "@/components/ui/ZaloLink";
import { site } from "@/content/site";
import { skillLabel } from "@/content/types";

const skills = Object.values(skillLabel);

export function Hero() {
  return (
    <section id="hero" data-section="hero" className="wrap" style={{ paddingBlock: "clamp(24px, 4vw, 56px)" }}>
      <div className="grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
        <div>
          <SplitReveal as="h1" trigger="load" className="h1-hero">
            IELTS 1 kèm 1 online. Giáo viên 8.0 <span className="text-[var(--brand-ink)]">dạy riêng bạn.</span>
          </SplitReveal>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.125rem,0.9rem+0.8vw,1.5rem)] font-semibold leading-snug">
            Lộ trình riêng, <span className="text-[var(--muted)]">kiểm tra mỗi tháng để chỉnh lại. Học ở đâu cũng được.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href="#dang-ky" className="btn btn-primary" data-hero-cta>
                <span className="kit-roll">
                  <span>{site.cta.primary}</span>
                  <span aria-hidden="true">{site.cta.primary}</span>
                </span>
              </a>
            </Magnetic>
            <ZaloLink className="btn btn-line" />
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Bốn kỹ năng">
            {skills.map((s) => (
              <li key={s} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-[0.9375rem] font-semibold">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-6 lg:mt-28" data-hero-art>
          <div className="hero-cat-static" aria-hidden="true">
            <CatRig size={120} />
          </div>
          <div data-cat-perch="right">
          <Tilt className="rounded-[var(--r-card)] border border-[var(--line)] bg-white p-4 sm:p-5">
            <p className="mb-3 text-sm font-semibold text-[var(--muted)]">Một buổi học 1-1 (minh họa)</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex aspect-[4/3] flex-col justify-end rounded-[var(--r-inner)] bg-[var(--ink)] p-3 text-white">
                <span className="text-sm font-bold">Giáo viên</span>
                <span className="text-xs opacity-100">IELTS 8.0</span>
              </div>
              <div className="flex aspect-[4/3] flex-col justify-end rounded-[var(--r-inner)] bg-[var(--brand-soft)] p-3">
                <span className="text-sm font-bold">Bạn</span>
                <span className="text-xs text-[var(--muted)]">Đang nghe và trả lời</span>
              </div>
            </div>
            <div className="mt-3 rounded-[var(--r-inner)] bg-[var(--paper)] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Writing Task 2</p>
              <p className="mt-2 leading-relaxed">
                Many people <s className="decoration-2 decoration-[var(--brand-ink)]">is</s> <span className="font-bold text-[var(--brand-ink)]">are</span> in favour of working from home.
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">Giáo viên: chủ ngữ số nhiều thì động từ cũng số nhiều.</p>
            </div>
          </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
