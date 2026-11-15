import { Rise } from "@/components/motion/Rise";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { painPoints } from "@/content/painPoints";
import type { Audience } from "@/content/types";

/** "Bạn có thấy quen không?": các tình huống thật của từng nhóm, mỗi dòng kèm cách Sophie xử lý (không thẻ, không icon). */
export function AudiencePains({ audience }: { audience: Audience }) {
  return (
    <section data-section="tinh-huong" className="section">
      <div className="wrap">
        <SectionHeading before="Bạn có thấy" accent="quen không?" sub="Những tình huống hay gặp khi học IELTS, và cách Sophie giải quyết." />
        <div className="mx-auto mt-10 max-w-[980px] border-t border-[var(--line)]">
          {painPoints[audience].map((row, i) => (
            <Rise key={row.pain} index={i % 3} className="grid gap-2 border-b border-[var(--line)] py-6 md:grid-cols-2 md:gap-12">
              <p className="text-[1.1875rem] font-bold leading-snug">{row.pain}</p>
              <p className="text-[var(--muted)]">{row.answer}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
