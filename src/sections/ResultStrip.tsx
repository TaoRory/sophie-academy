import { results } from "@/content/results";
import { audienceLabel } from "@/content/types";

/** Chỉ hiện khi có đủ kết quả thật (>= 6). Chưa đủ thì không render phần này. P4 thêm VelocityMarquee + nút dừng. */
export function ResultStrip() {
  const items = results.filter((r) => r.consent && r.showInStrip);
  if (items.length < 6) return null;
  return (
    <section id="ket-qua-strip" data-section="ket-qua-strip" aria-label="Kết quả học viên" className="bg-[var(--paper)] py-6">
      <ul className="wrap flex gap-4 overflow-x-auto">
        {items.map((r) => (
          <li key={r.name + r.after} className="shrink-0 rounded-[var(--r-card)] border border-[var(--line)] bg-white px-5 py-3">
            <p className="text-sm font-semibold text-[var(--muted)]">
              {r.name} · {audienceLabel[r.audience]} · {r.months} tháng
            </p>
            <p className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              {r.before} → {r.after}
            </p>
          </li>
        ))}
      </ul>
      <p className="wrap mt-3">
        <a href="#ket-qua" className="font-semibold underline underline-offset-4">
          Xem tất cả kết quả
        </a>
      </p>
    </section>
  );
}
