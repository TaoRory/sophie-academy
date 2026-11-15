"use client";

import { useState } from "react";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/content/home";
import { roadmapVisuals } from "./RoadmapVisuals";

/** "Giá trị khác biệt" kiểu DOL: một thẻ lớn, nội dung trên, ba tab ở đáy. */
export function Values() {
  const [i, setI] = useState(0);
  const v = values[i];
  return (
    <section id="gia-tri" data-section="gia-tri" className="section wrap">
      <SectionHeading before="Vì sao học IELTS" accent="1 kèm 1" after="ở Sophie" />
      <Rise kind="pop" className="mt-10 overflow-hidden rounded-[var(--r-sheet)] border border-[var(--line)] bg-white">
        <div id="gia-tri-panel" role="tabpanel" aria-labelledby={`gia-tri-tab-${i}`} className="grid min-h-[360px] items-center gap-10 p-6 sm:p-10 lg:grid-cols-[5fr_6fr]">
          <div>
            <p className="inline-flex rounded-full bg-[var(--ink)] px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white">{v.badge}</p>
            <h3 className="mt-5 text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] leading-tight">{v.title}</h3>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {v.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2 font-semibold">
                  <Icon name="check" size={20} className="shrink-0 text-[var(--brand-ink)]" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div key={i} className={`values-visual grid items-start gap-4 ${v.visuals.length > 1 ? "sm:grid-cols-2" : "mx-auto w-full max-w-[460px]"}`}>
            {v.visuals.map((k, j) => {
              const Visual = roadmapVisuals[k];
              return (
                <div key={k} className={j % 2 ? "sm:mt-10 sm:rotate-2" : "sm:-rotate-2"}>
                  <Visual />
                </div>
              );
            })}
          </div>
        </div>
        <div role="tablist" aria-label="Giá trị khác biệt" className="grid border-t border-[var(--line)] sm:grid-cols-3">
          {values.map((t, k) => (
            <button
              key={t.tab}
              id={`gia-tri-tab-${k}`}
              type="button"
              role="tab"
              aria-selected={i === k}
              aria-controls="gia-tri-panel"
              onClick={() => setI(k)}
              className={`relative px-6 py-5 text-center transition-colors duration-200 max-sm:border-b sm:border-r sm:last:border-r-0 border-[var(--line)] ${i === k ? "bg-[var(--brand-soft)]" : "hover:bg-[var(--paper)]"}`}
            >
              <span className={`absolute inset-x-0 top-0 h-[3px] ${i === k ? "bg-[var(--brand)]" : "bg-transparent"}`} />
              <span className="block text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{t.tab}</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">{t.tabSub}</span>
            </button>
          ))}
        </div>
      </Rise>
    </section>
  );
}
