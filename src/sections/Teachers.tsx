import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teachers } from "@/content/teachers";

/** Đội ngũ giáo viên kiểu DOL: khung viền bo lớn, băng thẻ chân dung có chip điểm, cuộn ngang có điểm bắt. */
export function Teachers() {
  return (
    <section id="giao-vien" data-section="giao-vien" className="section">
      <div className="wrap">
        <div className="rounded-[var(--r-sheet)] border-2 border-[var(--brand)] px-5 py-10 sm:px-10">
          <SectionHeading tag="Giáo viên dạy 1 kèm 1" before="Đội ngũ" accent="giáo viên" after="IELTS 8.0" sub="Giàu kinh nghiệm và tận tâm với từng học viên." />
          <div className="relative mt-10">
            <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {teachers.length
                ? teachers.map((t, i) => (
                    <Rise as="li" kind="pop" index={i % 4} key={t.slug} className="w-[220px] shrink-0 snap-start sm:w-[240px]">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--r-card)] bg-[var(--brand-soft)]">
                        <Image src={t.photo} alt={t.name} fill sizes="240px" className="object-cover" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-[var(--ink)] px-3 py-1 text-sm font-bold text-white">{t.band} IELTS Overall</span>
                      </div>
                      <p className="mt-3 text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{t.name}</p>
                      <p className="text-sm text-[var(--muted)]">{t.strengths.join(" · ")}</p>
                    </Rise>
                  ))
                : Array.from({ length: 4 }, (_, i) => (
                    <li key={i} data-todo="sophie" className="w-[220px] shrink-0 snap-start sm:w-[240px]">
                      <div className="relative aspect-[4/5] rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] bg-[var(--paper)]">
                        <span className="absolute bottom-3 left-3 rounded-full bg-[var(--ink)] px-3 py-1 text-sm font-bold text-white">IELTS 8.0</span>
                      </div>
                      <p className="mt-3 font-semibold text-[var(--muted)]">Hồ sơ đang cập nhật</p>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
