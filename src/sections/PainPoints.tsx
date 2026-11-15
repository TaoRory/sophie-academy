"use client";

import { useId } from "react";
import { useLead } from "@/components/LeadContext";
import { painIntro, painPoints } from "@/content/painPoints";
import { type Audience, audienceLabel } from "@/content/types";

const order: Audience[] = ["hoc-sinh", "sinh-vien", "di-lam"];

export function PainPoints() {
  const { audience, setAudience } = useLead();
  const id = useId();

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = order[(i + (e.key === "ArrowRight" ? 1 : order.length - 1)) % order.length];
    setAudience(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section id="noi-dau" data-section="noi-dau" className="section bg-[var(--paper)]">
      <div className="wrap">
        <h2 style={{ fontSize: "clamp(1.875rem, 1rem + 3.4vw, 3.5rem)" }}>
          {painIntro.strong} <span className="text-[var(--muted)]">{painIntro.muted}</span>
        </h2>

        <div role="tablist" aria-label="Bạn là" className="mt-10 flex flex-wrap gap-2">
          {order.map((a, i) => (
            <button
              key={a}
              id={`${id}-tab-${a}`}
              role="tab"
              type="button"
              aria-selected={audience === a}
              aria-controls={`${id}-panel`}
              tabIndex={audience === a ? 0 : -1}
              onClick={() => setAudience(a)}
              onKeyDown={(e) => onKey(e, i)}
              className={`btn ${audience === a ? "btn-ink" : "btn-line"}`}
            >
              {audienceLabel[a]}
            </button>
          ))}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${audience}`} className="mt-8 border-t border-[var(--line)]">
          {painPoints[audience].map((row) => (
            <div key={row.pain} className="grid gap-2 border-b border-[var(--line)] py-6 md:grid-cols-2 md:gap-12">
              <p className="text-[1.1875rem] font-semibold leading-snug">{row.pain}</p>
              <p className="text-[var(--muted)]">{row.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
