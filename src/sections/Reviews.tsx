import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";

/** Cảm nhận học viên kiểu DOL: băng thẻ trích dẫn + ảnh tin nhắn, cuộn ngang có điểm bắt. Chỉ dữ liệu có đồng ý. */
export function Reviews() {
  const items = testimonials.filter((t) => t.consent);
  return (
    <section id="cam-nhan" data-section="cam-nhan" className="section bg-[var(--paper)]">
      <div className="wrap">
        <SectionHeading before="Lắng nghe" accent="học viên Sophie" after="chia sẻ" />
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
          {items.length
            ? items.map((t, i) => (
                <Rise as="li" kind="pop" index={i % 3} key={t.name + (t.quote ?? t.screenshot)} className="flex w-[min(86vw,560px)] shrink-0 snap-start gap-5 rounded-[var(--r-card)] border border-[var(--line)] bg-white p-6">
                  <div className="flex flex-1 flex-col">
                    {t.quote && <blockquote className="text-lg font-semibold leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>}
                    <p className="mt-auto pt-5 font-bold">{t.name}</p>
                    <p className="text-sm text-[var(--muted)]">{t.role}</p>
                  </div>
                  {t.screenshot && <Image src={t.screenshot} alt={`Tin nhắn của ${t.name}`} width={200} height={260} className="hidden w-[200px] rounded-[var(--r-inner)] border border-[var(--line)] object-cover sm:block" />}
                </Rise>
              ))
            : Array.from({ length: 3 }, (_, i) => (
                <li key={i} data-todo="sophie" className="w-[min(86vw,420px)] shrink-0 snap-start rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] bg-white p-6 text-[var(--muted)]">
                  <p className="font-semibold">Cảm nhận của học viên và phụ huynh đang cập nhật.</p>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
