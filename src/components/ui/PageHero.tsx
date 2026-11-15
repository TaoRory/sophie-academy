import Link from "next/link";
import { SplitReveal } from "@/components/motion/SplitReveal";

/** Đầu trang con: nền navy, góc cam + xám như ảnh bìa, breadcrumb, H1 (một cụm nhấn cam), câu mô tả. */
export function PageHero({ crumbs, title, accent, sub, children }: { crumbs: { label: string; href?: string }[]; title: string; accent?: string; sub?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section data-section="page-hero" className="brand-hero brand-hero--sm pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="wrap">
        <nav aria-label="Vị trí trang" className="text-sm font-semibold text-[var(--paper)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 hover:underline">
                Trang chủ
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.href ? (
                  <Link href={c.href} className="underline-offset-4 hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <SplitReveal as="h1" trigger="load" className="mt-6 max-w-[18ch] text-white" >
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-[var(--brand)]">{accent}</span>
            </>
          )}
        </SplitReveal>
        {sub && <p className="mt-5 max-w-[58ch] text-lg text-[var(--paper)]">{sub}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
