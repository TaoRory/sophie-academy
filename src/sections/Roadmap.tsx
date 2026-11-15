import { roadmapSteps } from "@/content/roadmap";
import { roadmapVisuals } from "./RoadmapVisuals";

/** P1: bản tĩnh (cũng là bản cho điện thoại / giảm chuyển động). Cảnh ghim + đường đuôi mèo thêm ở P4. */
export function Roadmap() {
  return (
    <section id="lo-trinh" data-section="lo-trinh" className="section bg-[var(--paper)]">
      <div className="wrap">
        <h2 className="max-w-[18ch]">
          Lộ trình của bạn <span className="text-[var(--muted)]">tại Sophie.</span>
        </h2>
        <ol className="mt-12 grid gap-10">
          {roadmapSteps.map((s, i) => {
            const Visual = roadmapVisuals[i];
            return (
              <li key={s.title} className="grid items-center gap-6 md:grid-cols-2 md:gap-14">
                <div className={i % 2 ? "md:order-2" : undefined}>
                  <p className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {i + 1}
                  </p>
                  <h3 className="mt-4 text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] leading-tight">{s.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-[var(--muted)]">{s.body}</p>
                </div>
                <Visual />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
