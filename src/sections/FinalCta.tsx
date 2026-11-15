import { Rise } from "@/components/motion/Rise";
import { LeadForm } from "@/components/LeadForm";
import { ZaloLink } from "@/components/ui/ZaloLink";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="dang-ky" data-section="dang-ky" className="section wrap">
      <h2 className="max-w-[18ch]">
        {site.cta.primary}. <span className="text-[var(--muted)]">Sophie sẽ liên hệ bạn.</span>
      </h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-[7fr_5fr]">
        <Rise kind="pop" className="sheet bg-[var(--brand)] p-6 text-[var(--ink)] sm:p-10">
          <LeadForm />
        </Rise>
        <Rise kind="pop" index={1} data-cat-perch="right" className="sheet flex flex-col justify-between gap-8 border border-[var(--line)] p-6 sm:p-10">
          <div>
            <h3 className="text-3xl">Muốn hỏi nhanh?</h3>
            <p className="mt-3 text-[var(--muted)]">Nhắn Sophie qua Zalo, bạn sẽ được trả lời trực tiếp.</p>
          </div>
          {site.zaloUrl ? (
            <ZaloLink className="btn btn-ink self-start" />
          ) : (
            <p data-todo="sophie" className="rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] p-4 text-[var(--muted)]">
              Kênh Zalo đang được cập nhật.
            </p>
          )}
          {site.hotline && <p className="font-bold">Hotline: {site.hotline}</p>}
        </Rise>
      </div>
    </section>
  );
}
