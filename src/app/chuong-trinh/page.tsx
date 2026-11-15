import type { Metadata } from "next";
import Link from "next/link";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { programs } from "@/content/home";
import { skillPages } from "@/content/programs";
import { FinalCta } from "@/sections/FinalCta";

export const metadata: Metadata = {
  title: "Chương trình IELTS 1 kèm 1 | Sophie IELTS",
  description: "Chương trình IELTS 1 kèm 1 cho học sinh, sinh viên và người đi làm, học đủ 4 kỹ năng.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Chương trình" }]} title="Chương trình" accent="IELTS 1 kèm 1" sub="Chọn nhóm của bạn để xem cách Sophie học cùng bạn, hoặc xem từng kỹ năng." />
      <section className="section">
        <div className="wrap">
          <SectionHeading before="Theo" accent="đối tượng" />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {programs.map((p, i) => (
              <Rise as="li" kind="pop" index={i} key={p.slug} className="card-lift rounded-[var(--r-card)] border border-[var(--line)] bg-white">
                <Link href={`/chuong-trinh/${p.slug}`} className="block p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-soft)]">
                    <Icon name={p.icon} />
                  </span>
                  <span className="mt-4 block text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{p.title}</span>
                  <span className="mt-2 block text-[var(--muted)]">{p.sub}</span>
                  <span className="mt-4 inline-flex items-center gap-2 font-bold text-[var(--brand-ink)]">
                    Xem chương trình <Icon name="arrowRight" size={18} />
                  </span>
                </Link>
              </Rise>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-[var(--paper)]">
        <div className="wrap">
          <SectionHeading before="Theo" accent="kỹ năng" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillPages.map((s, i) => (
              <Rise as="li" kind="pop" index={i} key={s.id} className="card-lift rounded-[var(--r-card)] border border-[var(--line)] bg-white">
                <Link href={`/chuong-trinh/4-ky-nang#${s.id}`} className="block p-5">
                  <span className="block text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{s.title}</span>
                  <span className="mt-2 block text-[0.9375rem] text-[var(--muted)]">{s.lead}</span>
                </Link>
              </Rise>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
