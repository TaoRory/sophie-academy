import { Rise } from "@/components/motion/Rise";
import { DrawIcon } from "@/components/pen/DrawIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { onlineFeatures } from "@/content/home";

/** Học online 1-1 thế nào: hàng tiện ích có icon (kiểu "hệ thống cơ sở" của DOL), lấy từ nội quy học viên. */
export function HowOnline() {
  return (
    <section id="hoc-online" data-section="hoc-online" className="section wrap">
      <SectionHeading tag="Nội quy học viên" before="Học online" accent="1 kèm 1" after="diễn ra thế nào" />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {onlineFeatures.map((f, i) => (
          <Rise as="li" kind="pop" index={i} key={f.title} className="card-lift rounded-[var(--r-card)] border border-[var(--line)] bg-white p-6 lg:border-0 lg:border-r lg:rounded-none lg:last:border-r-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--ink)]">
              <DrawIcon name={f.icon} delay={i * 0.08} />
            </span>
            <h3 className="mt-4 text-lg">{f.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-[var(--muted)]">{f.body}</p>
          </Rise>
        ))}
      </ul>
      <p className="mx-auto mt-10 max-w-[60ch] rounded-[var(--r-card)] sm:rounded-full bg-[var(--brand-soft)] px-6 py-3 text-center font-bold">
        Học nghiêm túc – Tiến bộ từng ngày – Chinh phục mục tiêu IELTS
      </p>
    </section>
  );
}
