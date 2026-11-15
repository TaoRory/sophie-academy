"use client";

import { useRef, useState } from "react";
import { Rise } from "@/components/motion/Rise";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLead } from "@/components/LeadContext";
import { Flip, MQ, scrollToTarget, useGSAP } from "@/lib/motion";
import { bands, deadlines, estimatorRules, priorityFor, targets } from "@/content/estimatorRules";
import { type Audience, audienceLabel, skillLabel } from "@/content/types";

const audiences: Audience[] = ["hoc-sinh", "sinh-vien", "di-lam"];

function Chips<T extends string>({ legend, options, value, onChange }: { legend: string; options: readonly T[]; value: T | null; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 font-bold">{legend}</legend>
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={legend} className="peer sr-only" checked={value === o} onChange={() => onChange(o)} />
            <span className="inline-flex min-h-11 items-center rounded-full border-2 border-[var(--line)] px-4 font-semibold transition-colors duration-200 peer-checked:border-[var(--ink)] peer-checked:bg-[var(--ink)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ink)]">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Estimator() {
  const { audience, setAudience, setPrefill } = useLead();
  const [band, setBand] = useState<(typeof bands)[number] | null>(null);
  const [target, setTarget] = useState<(typeof targets)[number] | null>(null);
  const [deadline, setDeadline] = useState<(typeof deadlines)[number] | null>(null);
  const ready = band && target && deadline;
  const order = ready ? priorityFor(band, deadline) : null;
  const orderKey = order?.join(",");
  const listRef = useRef<HTMLOListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  // Ghi vị trí cũ của các hàng trước khi đổi lựa chọn, rồi Flip về vị trí mới sau khi React vẽ lại.
  const capture = () => {
    if (listRef.current && window.matchMedia(MQ.anyMotion).matches) flipState.current = Flip.getState(listRef.current.children);
  };
  useGSAP(
    () => {
      const state = flipState.current;
      flipState.current = null;
      if (state && listRef.current) Flip.from(state, { duration: 0.5, ease: "power3.inOut" });
    },
    { dependencies: [orderKey], scope: listRef },
  );

  const send = () => {
    if (!ready) return;
    setPrefill({ currentBand: band, target, deadline });
    const el = document.querySelector<HTMLElement>("#dang-ky");
    if (el) scrollToTarget(el, { offset: -64 });
  };

  return (
    <section id="uoc-luong" data-section="uoc-luong" className="section wrap">
      <SectionHeading before="Thử ước lượng" accent="lộ trình của bạn" sub="Chọn nhanh vài thông tin, Sophie gợi ý thứ tự kỹ năng nên ưu tiên." />
      <Rise kind="pop" className="mt-10 grid gap-10 rounded-[var(--r-sheet)] border border-[var(--line)] p-6 sm:p-10 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-7">
          <Chips legend="Bạn là" options={audiences.map((a) => audienceLabel[a])} value={audienceLabel[audience]} onChange={(l) => setAudience(audiences.find((a) => audienceLabel[a] === l) ?? "hoc-sinh")} />
          <Chips legend="Band hiện tại" options={bands} value={band} onChange={(v) => { capture(); setBand(v); }} />
          <Chips legend="Mục tiêu" options={targets} value={target} onChange={(v) => { capture(); setTarget(v); }} />
          <Chips legend="Hạn thi" options={deadlines} value={deadline} onChange={(v) => { capture(); setDeadline(v); }} />
        </div>

        <div aria-live="polite" className="rounded-[var(--r-card)] bg-[var(--brand-soft)] p-6">
          {order ? (
            <>
              <p className="font-bold">Thứ tự kỹ năng nên ưu tiên</p>
              <ol ref={listRef} className="mt-4 grid gap-2">
                {order.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 rounded-[var(--r-inner)] bg-white px-4 py-3 font-semibold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ink)] text-sm text-white">{i + 1}</span>
                    {skillLabel[s]}
                  </li>
                ))}
              </ol>
              {estimatorRules.status === "pending" && <p className="mt-4 text-[var(--muted)]">Sophie chốt số buổi mỗi tuần và số tháng sau kiểm tra đầu vào.</p>}
              <p className="mt-3 text-sm text-[var(--muted)]">Ước lượng tham khảo, lộ trình chính thức chốt sau kiểm tra đầu vào.</p>
              <button type="button" onClick={send} className="btn btn-primary mt-5">
                Gửi để nhận lộ trình chính xác
              </button>
            </>
          ) : (
            <p className="text-[var(--muted)]">Chọn band hiện tại, mục tiêu và hạn thi để xem thứ tự kỹ năng nên ưu tiên.</p>
          )}
        </div>
      </Rise>
    </section>
  );
}
