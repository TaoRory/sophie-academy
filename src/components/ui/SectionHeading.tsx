/** Tiêu đề phần kiểu DOL: căn giữa, một cụm nhấn màu cam đậm, có thể kèm nhãn viên phía trên và câu phụ. */
export function SectionHeading({
  before,
  accent,
  after,
  tag,
  sub,
  align = "center",
  className,
}: {
  before?: string;
  accent: string;
  after?: string;
  tag?: string;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[820px] ${className ?? ""}`}>
      {tag && (
        <p className={`mb-4 inline-flex rounded-full border border-[var(--brand)] bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-[var(--brand-ink)]`}>{tag}</p>
      )}
      <h2>
        {before && <>{before} </>}
        <span className="text-[var(--accent-text)]">{accent}</span>
        {after && <> {after}</>}
      </h2>
      {sub && <p className={`mt-4 text-lg text-[var(--muted)] ${center ? "mx-auto" : ""} max-w-[60ch]`}>{sub}</p>}
    </div>
  );
}
