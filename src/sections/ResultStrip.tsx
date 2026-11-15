"use client";

import { useState } from "react";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { results } from "@/content/results";
import { audienceLabel } from "@/content/types";

/** Chỉ hiện khi có đủ kết quả thật (>= 6). Băng chạy theo tốc độ cuộn, có nút tạm dừng (luật kit: tự chạy > 5s). */
export function ResultStrip() {
  const [paused, setPaused] = useState(false);
  const items = results.filter((r) => r.consent && r.showInStrip);
  if (items.length < 6) return null;
  return (
    <section id="ket-qua-strip" data-section="ket-qua-strip" aria-label="Kết quả học viên" className="bg-[var(--paper)] py-6">
      <VelocityMarquee paused={paused}>
        {items.map((r) => (
          <div key={r.name + r.after} className="mr-4 shrink-0 rounded-[var(--r-card)] border border-[var(--line)] bg-white px-5 py-3">
            <p className="text-sm font-semibold text-[var(--muted)]">
              {r.name} · {audienceLabel[r.audience]} · {r.months} tháng
            </p>
            <p className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              {r.before} → {r.after}
            </p>
          </div>
        ))}
      </VelocityMarquee>
      <div className="wrap mt-3 flex items-center justify-between gap-4">
        <a href="#ket-qua" className="font-semibold underline underline-offset-4">
          Xem tất cả kết quả
        </a>
        <button type="button" aria-pressed={paused} onClick={() => setPaused((v) => !v)} className="btn btn-line" style={{ minHeight: 44, padding: "0 1rem" }}>
          {paused ? "Chạy tiếp" : "Tạm dừng"}
        </button>
      </div>
    </section>
  );
}
