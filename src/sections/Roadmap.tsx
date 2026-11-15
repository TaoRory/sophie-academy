import { Rise } from "@/components/motion/Rise";
import { roadmapSteps } from "@/content/roadmap";
import { RoadmapScene } from "./RoadmapScene";
import { roadmapVisuals } from "./RoadmapVisuals";

/** Bản tĩnh (điện thoại, giảm chuyển động, không JS) đặt trong cảnh ghim; máy tính có chuyển động thì RoadmapScene thay thế. */
export function Roadmap() {
  return (
    <RoadmapScene>
      <ol className="mt-12 grid gap-10">
        {roadmapSteps.map((s, i) => {
          const Visual = roadmapVisuals[i];
          return (
            <Rise as="li" index={0} key={s.title} className="grid items-center gap-6 md:grid-cols-2 md:gap-14">
              <div className={i % 2 ? "md:order-2" : undefined}>
                <p className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {i + 1}
                </p>
                <h3 className="mt-4 text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] leading-tight">{s.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[var(--muted)]">{s.body}</p>
              </div>
              <Visual />
            </Rise>
          );
        })}
      </ol>
    </RoadmapScene>
  );
}
