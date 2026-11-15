import Image from "next/image";
import { results } from "@/content/results";
import { audienceLabel } from "@/content/types";

export function Results() {
  const shown = results.filter((r) => r.consent);
  const story = shown.find((r) => r.featured) ?? shown[0];
  const grid = shown.filter((r) => r.scoreImage && r !== story);

  return (
    <section id="ket-qua" data-section="ket-qua" className="section bg-[var(--brand-soft)]">
      <div className="wrap">
        <h2 className="max-w-[20ch]">
          Kết quả thật <span className="text-[var(--muted)]">của học viên Sophie.</span>
        </h2>

        {!story ? (
          <p data-todo="sophie" className="mt-10 max-w-[52ch] rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] p-6 text-[var(--muted)]">
            Bảng điểm và câu chuyện học viên đang được cập nhật.
          </p>
        ) : (
          <>
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="font-semibold text-[var(--muted)]">
                  {story.name} · {audienceLabel[story.audience]} · {story.months} tháng
                </p>
                <p className="mt-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 2rem + 5vw, 6.5rem)", fontWeight: 900, lineHeight: 1 }}>
                  {story.before} <span aria-label="lên">→</span> {story.after}
                </p>
                {story.quote && <blockquote className="mt-6 max-w-[48ch] text-xl font-semibold leading-snug">&ldquo;{story.quote}&rdquo;</blockquote>}
              </div>
              {story.scoreImage && <Image src={story.scoreImage} alt={`Bảng điểm IELTS của ${story.name}`} width={720} height={520} className="w-full rounded-[var(--r-card)] border border-[var(--line)] bg-white" />}
            </div>
            {grid.length > 0 && (
              <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {grid.map((r) => (
                  <li key={r.name + r.after}>
                    <Image src={r.scoreImage!} alt={`Bảng điểm IELTS của ${r.name}: ${r.before} lên ${r.after}`} width={360} height={260} className="w-full rounded-[var(--r-card)] border border-[var(--line)] bg-white" />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
