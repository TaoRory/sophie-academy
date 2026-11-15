import { Magnetic } from "@/components/motion/Magnetic";
import { LiveCorrection } from "@/components/pen/LiveCorrection";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Icon } from "@/components/ui/Icon";
import { ZaloLink } from "@/components/ui/ZaloLink";
import { heroFacts, heroPills, programs } from "@/content/home";
import { site } from "@/content/site";

/** Hero kiểu DOL: căn giữa, viên chương trình, tiêu đề hai dòng, hàng dữ kiện, hình nghiêng hai bên, lưới thẻ chương trình. */
export function Hero() {
  return (
    <section id="hero" data-section="hero" className="paper-ruled relative overflow-x-clip pb-16 pt-8 sm:pt-16">
      {/* Hình nghiêng hai bên (minh họa), chỉ màn rộng */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[max(24px,calc(50%-700px))] top-40 hidden w-60 -rotate-6 min-[1536px]:block">
        <div className="rounded-[var(--r-card)] border border-[var(--line)] bg-white p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex aspect-[4/3] flex-col justify-end rounded-[var(--r-inner)] bg-[var(--ink)] p-2 text-xs font-bold text-white">Giáo viên</div>
            <div className="flex aspect-[4/3] flex-col justify-end rounded-[var(--r-inner)] bg-[var(--brand-soft)] p-2 text-xs font-bold">Bạn</div>
          </div>
          <p className="mt-2 text-xs font-semibold text-[var(--muted)]">Buổi học 1-1 (minh họa)</p>
        </div>
      </div>
      <div className="wrap text-center">
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Chương trình">
          {heroPills.map((p, i) => (
            <li key={p} className={`rounded-full px-4 py-1.5 text-sm font-extrabold ${i === 0 ? "bg-[var(--brand)] text-[var(--ink)]" : i === 1 ? "bg-[var(--ink)] text-white" : "border border-[var(--ink)] bg-white"}`}>
              {p}
            </li>
          ))}
        </ul>

        <SplitReveal as="h1" trigger="load" className="h1-hero mx-auto mt-4 max-w-[16ch] sm:mt-6">
          Học IELTS 1 kèm 1 cùng <span className="text-[var(--accent-text)]">Sophie IELTS</span>
        </SplitReveal>
        <p className="mx-auto mt-4 max-w-[52ch] text-[1.0625rem] text-[var(--muted)] sm:mt-5 sm:text-lg">
          Giáo viên IELTS 8.0 dạy riêng bạn qua Zoom/Meet. Lộ trình lập sau kiểm tra đầu vào và được chỉnh lại mỗi tháng.
        </p>

        <dl className="mx-auto mt-6 grid sm:mt-8 max-w-[640px] grid-cols-3 divide-x divide-[var(--line)]">
          {heroFacts.map((f) => (
            <div key={f.value} className="px-3">
              <dt className="sr-only">{f.label}</dt>
              <dd className="whitespace-nowrap text-[clamp(1.0625rem,0.75rem+1.8vw,2rem)] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                {f.value}
              </dd>
              <dd className="mt-1 text-xs font-bold uppercase tracking-wide text-[var(--muted)] sm:text-sm">{f.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
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

        <LiveCorrection className="hero-paper" />

        <div className="mx-auto mt-12 grid max-w-[980px] overflow-hidden rounded-[var(--r-sheet)] border border-[var(--line)] bg-white text-left sm:grid-cols-3">
          {programs.map((p, i) => (
            <Rise key={p.audience} as="a" kind="pop" index={i} href="#uoc-luong" className="group card-lift flex items-start gap-4 border-[var(--line)] p-6 transition-colors duration-200 hover:bg-[var(--brand-soft)] max-sm:border-b sm:border-r sm:last:border-r-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--ink)] transition-colors group-hover:bg-white">
                <Icon name={p.icon} />
              </span>
              <span>
                <span className="block text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{p.title}</span>
                <span className="mt-1 block text-[0.9375rem] text-[var(--muted)]">{p.sub}</span>
              </span>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
