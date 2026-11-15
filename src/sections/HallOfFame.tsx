"use client";

import Image from "next/image";
import { useState } from "react";
import { Rise } from "@/components/motion/Rise";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/content/results";
import { type Audience, audienceLabel } from "@/content/types";

const filters: (Audience | "all")[] = ["all", "hoc-sinh", "sinh-vien", "di-lam"];

/** "Bảng vàng" kiểu DOL: lưới thẻ học viên, dải điểm ở góc. Chỉ dữ liệu thật có đồng ý đăng (consent). */
export function HallOfFame() {
  const [filter, setFilter] = useState<Audience | "all">("all");
  const shown = results.filter((r) => r.consent && (filter === "all" || r.audience === filter));
  const hasData = results.some((r) => r.consent);

  return (
    <section id="bang-vang" data-section="bang-vang" className="section bg-[var(--paper)]">
      <div className="wrap">
        <SectionHeading before="Bảng vàng" accent="học viên Sophie" sub="Kết quả thật, học viên đồng ý chia sẻ. Thông tin cá nhân trên bảng điểm đã được che." />

        {hasData && (
          <div role="tablist" aria-label="Lọc theo nhóm" className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-[var(--line)] bg-white p-1">
            {filters.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 font-bold transition-colors duration-200 ${filter === f ? "bg-[var(--ink)] text-white" : "text-[var(--ink)] hover:bg-[var(--brand-soft)]"}`}>
                {f === "all" ? "Tất cả" : audienceLabel[f]}
              </button>
            ))}
          </div>
        )}

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {hasData
            ? shown.map((r, i) => (
                <Rise as="li" kind="pop" index={i % 4} key={r.name + r.after} className="overflow-hidden rounded-[var(--r-card)] border border-[var(--line)] bg-white">
                  <div className="relative aspect-[4/3] bg-[var(--brand-soft)]">
                    {r.scoreImage && <Image src={r.scoreImage} alt={`Bảng điểm IELTS của ${r.name}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />}
                    <span className="absolute right-3 top-0 flex flex-col items-center rounded-b-[10px] bg-[var(--brand)] px-2.5 pb-2 pt-1.5 text-[var(--ink)]">
                      <b className="text-xl leading-none" style={{ fontFamily: "var(--font-display)" }}>{r.after}</b>
                      <span className="text-[0.6875rem] font-bold">IELTS</span>
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{r.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                      {audienceLabel[r.audience]} · {r.before} → {r.after} sau {r.months} tháng
                    </p>
                  </div>
                </Rise>
              ))
            : Array.from({ length: 4 }, (_, i) => (
                <li key={i} data-todo="sophie" className="overflow-hidden rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] bg-white">
                  <div className="relative aspect-[4/3] bg-[var(--paper)]">
                    <span className="absolute right-3 top-0 rounded-b-[10px] bg-[var(--line)] px-3 pb-3 pt-2" />
                  </div>
                  <div className="p-4 text-sm font-semibold text-[var(--muted)]">Bảng điểm đang cập nhật</div>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
