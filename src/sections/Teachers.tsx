import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { teachers } from "@/content/teachers";

export function Teachers() {
  const featured = teachers.find((t) => t.featured) ?? teachers[0];
  const rest = teachers.filter((t) => t !== featured);

  return (
    <section id="giao-vien" data-section="giao-vien" className="px-[var(--gutter)]" style={{ paddingBlock: "calc(var(--section-y) / 2)" }}>
      <div data-cat-perch="right" className="on-ink sheet mx-auto bg-[var(--ink)] text-white" style={{ maxWidth: 1240, padding: "clamp(28px, 5vw, 72px)" }}>
        <h2 className="max-w-[18ch]">
          Ai sẽ dạy bạn? <span className="text-white">Đội ngũ giáo viên IELTS 8.0.</span>
        </h2>

        {!featured ? (
          <p data-todo="sophie" className="mt-10 max-w-[52ch] rounded-[var(--r-card)] border-2 border-dashed border-white/40 p-6">
            Hồ sơ giáo viên đang được cập nhật.
          </p>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[5fr_7fr]">
            <Rise kind="wipe">
              <Image src={featured.photo} alt={featured.name} width={560} height={640} className="aspect-[7/8] w-full rounded-[var(--r-card)] object-cover" />
            </Rise>
            <div className="flex flex-col justify-center">
              <p className="text-[var(--brand)]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 2rem + 3vw, 4.5rem)", fontWeight: 900, lineHeight: 1 }}>
                IELTS {featured.band}
              </p>
              <h3 className="mt-3 text-3xl">{featured.name}</h3>
              <p className="mt-3 max-w-[52ch]">{featured.experience}</p>
              {featured.quote && <blockquote className="mt-5 max-w-[52ch] border-l-4 border-[var(--brand)] pl-4 text-lg font-semibold">{featured.quote}</blockquote>}
              <ul className="mt-5 flex flex-wrap gap-2">
                {featured.strengths.map((s) => (
                  <li key={s} className="rounded-full border border-white/50 px-3 py-1 text-sm font-semibold">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <ul className="mt-12 grid gap-0 border-t border-white/25">
            {rest.map((t) => (
              <li key={t.slug} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/25 py-4">
                <Image src={t.photo} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <p className="min-w-40 flex-1 font-bold">{t.name}</p>
                <p className="font-extrabold text-[var(--brand)]">IELTS {t.band}</p>
                <p className="flex flex-wrap gap-2 text-sm">
                  {t.strengths.map((s) => (
                    <span key={s} className="rounded-full border border-white/50 px-3 py-1">
                      {s}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
