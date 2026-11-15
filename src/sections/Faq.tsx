import { faq } from "@/content/faq";
import { site } from "@/content/site";
import { ZaloLink } from "@/components/ui/ZaloLink";

export function Faq() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="hoi-dap" data-section="hoi-dap" className="section bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap grid gap-10 lg:grid-cols-[4fr_8fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2>Hỏi đáp.</h2>
          <p className="mt-4 text-[var(--muted)]">Chưa thấy câu bạn cần? Hỏi Sophie trực tiếp.</p>
          {site.zaloUrl ? <ZaloLink className="btn btn-line mt-6" /> : <a href="#dang-ky" className="btn btn-line mt-6">{site.cta.primary}</a>}
        </div>
        <div className="border-t border-[var(--line)]">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-[var(--line)]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink)] text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
