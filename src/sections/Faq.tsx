import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";

export function Faq() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="hoi-dap" data-section="hoi-dap" className="section bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap">
        <SectionHeading before="Câu hỏi" accent="thường gặp" />
        <div className="mx-auto mt-10 grid max-w-[860px] gap-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-[var(--r-card)] border border-[var(--line)] bg-white px-6">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[66ch] pb-5 text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
