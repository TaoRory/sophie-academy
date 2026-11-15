import { Rise } from "@/components/motion/Rise";
import { PenMark } from "@/components/pen/PenMark";
import { skillPages } from "@/content/programs";

/** Bốn kỹ năng: mỗi kỹ năng một khối xen kẽ (neo #listening, #reading, #writing, #speaking). */
export function SkillBlocks() {
  return (
    <>
      {skillPages.map((s, i) => (
        <section key={s.id} id={s.id} data-section={s.id} className={`section scroll-mt-20 ${i % 2 ? "bg-[var(--paper)]" : ""}`}>
          <div className={`wrap grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <p className="inline-flex rounded-full bg-[var(--ink)] px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white">Kỹ năng {i + 1}/4</p>
              <h2 className="mt-4">{s.title}</h2>
              <p className="mt-4 max-w-[48ch] text-lg text-[var(--muted)]">{s.lead}</p>
            </div>
            <ul className="grid gap-3">
              {s.points.map((p, k) => (
                <Rise as="li" kind="pop" index={k} key={p} className="flex items-center gap-4 rounded-[var(--r-card)] border border-[var(--line)] bg-white p-5 text-lg font-bold">
                  <PenMark kind="tick" delay={0.1 + k * 0.1} duration={0.3} strokeWidth={4.5} className="h-6 w-8 shrink-0" />
                  {p}
                </Rise>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
