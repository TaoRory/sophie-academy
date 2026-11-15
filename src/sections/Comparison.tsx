import { Rise } from "@/components/motion/Rise";
import { comparisonCols, comparisonRows } from "@/content/comparison";

export function Comparison() {
  return (
    <section id="vi-sao-1-1" data-section="vi-sao-1-1" className="section wrap">
      <h2 className="max-w-[20ch]">
        Vì sao 1 kèm 1? <span className="text-[var(--muted)]">Vì cả buổi học là của bạn.</span>
      </h2>

      <Rise kind="pop" data-cat-perch="left" className="relative mt-10 overflow-x-auto pb-2" style={{ scrollSnapType: "x proximity" }}>
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
          <caption className="sr-only">So sánh lớp đông, gia sư tự do và Sophie 1-1</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-white p-4" />
              {comparisonCols.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`p-4 text-lg font-extrabold ${i === 2 ? "rounded-t-[var(--r-card)] bg-[var(--brand)] text-[var(--ink)]" : ""}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((r, ri) => (
              <tr key={r.label}>
                <th scope="row" className="sticky left-0 z-10 border-t border-[var(--line)] bg-white p-4 font-semibold">
                  {r.label}
                </th>
                {r.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`border-t border-[var(--line)] p-4 ${i === 2 ? `bg-[var(--brand-soft)] font-semibold ${ri === comparisonRows.length - 1 ? "rounded-b-[var(--r-card)]" : ""}` : "text-[var(--muted)]"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Rise>
    </section>
  );
}
