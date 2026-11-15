import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { testimonials } from "@/content/testimonials";

export function Feedback() {
  const items = testimonials.filter((t) => t.consent);
  return (
    <section id="feedback" data-section="feedback" className="section wrap">
      <h2 className="max-w-[22ch]">
        Học viên và phụ huynh <span className="text-[var(--muted)]">nói gì.</span>
      </h2>
      {items.length === 0 ? (
        <p data-todo="sophie" className="mt-10 max-w-[52ch] rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] p-6 text-[var(--muted)]">
          Phản hồi của học viên và phụ huynh đang được cập nhật.
        </p>
      ) : (
        <ul className="mt-10 gap-4 [column-gap:1rem] sm:columns-2 lg:columns-3">
          {items.map((t, i) => (
            <Rise as="li" kind="pop" index={i % 3} key={t.name + (t.quote ?? t.screenshot)} className="mb-4 break-inside-avoid">
              {t.screenshot ? (
                <Image src={t.screenshot} alt={`Tin nhắn của ${t.name} (${t.role})`} width={480} height={640} className="w-full rounded-[var(--r-card)] border border-[var(--line)]" />
              ) : (
                <figure className="rounded-[var(--r-card)] border border-[var(--line)] p-5">
                  <blockquote className="text-lg font-semibold leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-[var(--muted)]">
                    {t.name}, {t.role}
                  </figcaption>
                </figure>
              )}
            </Rise>
          ))}
        </ul>
      )}
    </section>
  );
}
