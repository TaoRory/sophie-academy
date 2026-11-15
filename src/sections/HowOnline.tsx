"use client";

import { useState } from "react";
import { howOnline } from "@/content/howOnline";

export function HowOnline() {
  const [i, setI] = useState(0);
  return (
    <section id="hoc-online" data-section="hoc-online" className="section wrap">
      <h2 className="max-w-[22ch]">
        Học online 1-1 <span className="text-[var(--muted)]">diễn ra thế nào.</span>
      </h2>
      <div className="mt-10 grid gap-8 lg:grid-cols-[5fr_7fr]">
        <ul className="grid content-start border-t border-[var(--line)]" role="tablist" aria-label="Các bước học online" aria-orientation="vertical">
          {howOnline.map((h, k) => (
            <li key={h.title} className="border-b border-[var(--line)]">
              <button
                type="button"
                role="tab"
                id={`ho-tab-${k}`}
                aria-selected={i === k}
                aria-controls="ho-panel"
                onClick={() => setI(k)}
                className={`flex w-full items-center gap-4 py-5 text-left text-xl font-extrabold transition-colors duration-200 ${i === k ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className={`h-3 w-3 shrink-0 rounded-full ${i === k ? "bg-[var(--brand)]" : "bg-[var(--line)]"}`} />
                {h.title}
              </button>
            </li>
          ))}
        </ul>
        <div id="ho-panel" data-cat-perch="right" role="tabpanel" aria-labelledby={`ho-tab-${i}`} className="rounded-[var(--r-sheet)] bg-[var(--paper)] p-8 sm:p-12">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Nội quy học viên</p>
          <p className="mt-4 max-w-[40ch] text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-snug">{howOnline[i].body}</p>
        </div>
      </div>
    </section>
  );
}
