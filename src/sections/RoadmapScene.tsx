"use client";

import { useRef, useState } from "react";
import { usePinProgress } from "@/components/motion/usePinProgress";
import { roadmapSteps } from "@/content/roadmap";
import { roadmapVisuals } from "./RoadmapVisuals";

const ROW = 84; // px mỗi mốc: đường S và chấm mốc căn theo hàng này
const AMP = 28;

// Đường uốn chữ S đi qua tâm 5 hàng (x = 32), mỗi đoạn bulge về một phía luân phiên.
const wave = roadmapSteps
  .slice(0, -1)
  .map((_, k) => {
    const y = ROW / 2 + ROW * k;
    const cx = 32 + (k % 2 ? -AMP : AMP);
    return `${k === 0 ? `M32 ${y}` : ""} C${cx} ${y + ROW * 0.3} ${cx} ${y + ROW * 0.7} 32 ${y + ROW}`;
  })
  .join(" ");

/**
 * Cảnh ghim cho máy tính (usePinProgress): danh sách bên trái điều khiển hình bên phải, đường đuôi chữ S vẽ dần theo cuộn.
 * `children` là bản tĩnh (server render) dùng cho điện thoại, giảm chuyển động, không JS: hook đặt data-live="true" thì CSS
 * (tokens.css) ẩn bản tĩnh và hiện cảnh.
 */
export function RoadmapScene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  usePinProgress(ref, { onProgress: (p) => setStep(Math.min(roadmapSteps.length - 1, Math.floor(p * roadmapSteps.length * 0.999))) });
  const Visual = roadmapVisuals[step];

  return (
    <section ref={ref} id="lo-trinh" data-section="lo-trinh" className="kit-pin bg-[var(--paper)]" style={{ "--kit-pin-length": "300vh" } as React.CSSProperties}>
      <div className="kit-pin-inner roadmap-inner">
        <div className="wrap">
          <h2>
            Lộ trình của bạn <span className="text-[var(--muted)]">tại Sophie.</span>
          </h2>

          <div className="roadmap-static">{children}</div>

          <div className="roadmap-scene mt-8 items-center gap-12" style={{ gridTemplateColumns: "minmax(0,5fr) minmax(0,6fr)" }}>
            <div className="relative" style={{ height: ROW * roadmapSteps.length }}>
              <svg aria-hidden="true" className="absolute left-0 top-0" width={64} height={ROW * roadmapSteps.length} viewBox={`0 0 64 ${ROW * roadmapSteps.length}`}>
                <path d={wave} fill="none" stroke="var(--line)" strokeWidth={6} strokeLinecap="round" />
                <path d={wave} pathLength={1} className="kit-draw" stroke="var(--brand)" strokeWidth={6} strokeLinecap="round" />
              </svg>
              <ol className="relative" aria-label="Các mốc lộ trình">
                {roadmapSteps.map((s, i) => (
                  <li key={s.title} data-active={i === step || undefined} className="relative flex flex-col justify-center pl-[88px]" style={{ height: ROW }}>
                    <span
                      aria-hidden="true"
                      className="absolute left-[24px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-[var(--ink)]"
                      style={{ background: i <= step ? "var(--ink)" : "var(--paper)", transition: "background-color .3s" }}
                    />
                    <h3 className={`text-[1.375rem] leading-tight transition-colors duration-300 ${i === step ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}>
                      <span className="sr-only">Bước {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-snug text-[var(--muted)]">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div key={step} className="roadmap-visual" aria-live="polite">
              <Visual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
