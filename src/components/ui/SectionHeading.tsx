import { SplitReveal } from "@/components/motion/SplitReveal";

type Tone = "light" | "dark" | "orange";

/**
 * Tiêu đề phần kiểu DOL: căn giữa, một cụm nhấn, có thể kèm nhãn viên phía trên và câu phụ.
 * tone: "light" (nền sáng, cụm nhấn cam đậm), "dark" (nền navy: chữ trắng, nhấn cam), "orange" (nền cam: toàn bộ chữ navy).
 */
export function SectionHeading({
  before,
  accent,
  after,
  tag,
  sub,
  align = "center",
  tone = "light",
  className,
}: {
  before?: string;
  accent: string;
  after?: string;
  tag?: string;
  sub?: React.ReactNode;
  align?: "center" | "left";
  tone?: Tone;
  className?: string;
}) {
  const center = align === "center";
  const accentCls = tone === "dark" ? "text-[var(--brand)]" : tone === "orange" ? "text-[var(--ink)]" : "text-[var(--accent-text)]";
  const textCls = tone === "dark" ? "text-white" : "text-[var(--ink)]";
  const subCls = tone === "dark" ? "text-[var(--paper)]" : tone === "orange" ? "text-[var(--ink)]" : "text-[var(--muted)]";
  const tagCls = tone === "dark" ? "border-[var(--brand)] text-[var(--brand)]" : tone === "orange" ? "border-[var(--ink)] text-[var(--ink)]" : "border-[var(--brand)] bg-white text-[var(--brand-ink)]";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[820px] ${textCls} ${className ?? ""}`}>
      {tag && <p className={`mb-4 inline-flex rounded-full border px-4 py-1.5 text-sm font-bold uppercase tracking-wide ${tagCls}`}>{tag}</p>}
      <SplitReveal as="h2" trigger="scroll">
        {before && <>{before} </>}
        <span className={accentCls}>{accent}</span>
        {after && <> {after}</>}
      </SplitReveal>
      {sub && <p className={`mt-4 text-lg ${subCls} ${center ? "mx-auto" : ""} max-w-[60ch]`}>{sub}</p>}
    </div>
  );
}
