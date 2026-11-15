import { LeadForm } from "@/components/LeadForm";
import { Rise } from "@/components/motion/Rise";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

/** Lời mời cuối kiểu DOL: ba thẻ liên hệ (Zalo, hotline, để lại thông tin) + form. Kênh chưa có thì ghi "đang cập nhật". */
export function FinalCta({ tone = "navy" }: { tone?: "navy" | "light" }) {
  const cards: { icon: IconName; title: string; body: string; href?: string; external?: boolean }[] = [
    { icon: "chat", title: "Nhắn Zalo", body: site.zaloUrl ? "Nhắn Sophie và được tư vấn ngay" : "Kênh Zalo đang cập nhật", href: site.zaloUrl ?? undefined, external: true },
    { icon: "phone", title: site.hotline ?? "Hotline", body: site.hotline ? "Gọi để được tư vấn" : "Số hotline đang cập nhật", href: site.hotline ? `tel:${site.hotline.replace(/\s/g, "")}` : undefined },
    { icon: "form", title: "Để lại thông tin", body: "Sophie liên hệ và gửi lộ trình riêng", href: "#form-dang-ky" },
  ];
  return (
    <section id="dang-ky" data-section="dang-ky" className={`section ${tone === "navy" ? "band-navy" : "bg-[var(--paper)]"}`}>
      <div className="wrap">
      <SectionHeading tone={tone === "navy" ? "dark" : "light"} before="Nhận lộ trình" accent="riêng cho bạn" sub="Chọn cách liên hệ thuận tiện nhất, Sophie sẽ kiểm tra đầu vào và gửi lộ trình cho bạn." />
      <div className="mx-auto mt-10 grid max-w-[920px] overflow-hidden rounded-[var(--r-sheet)] border border-[var(--line)] bg-white text-[var(--ink)] sm:grid-cols-3">
        {cards.map((c) => {
          const inner = (
            <>
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--ink)]">
                <Icon name={c.icon} />
              </span>
              <span className="mt-3 block text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{c.title}</span>
              <span className="mt-1 block text-[0.9375rem] text-[var(--muted)]">{c.body}</span>
            </>
          );
          const cls = "block border-[var(--line)] p-6 text-center max-sm:border-b sm:border-r sm:last:border-r-0";
          return c.href ? (
            <a key={c.title} href={c.href} className={`${cls} transition-colors duration-200 hover:bg-[var(--brand-soft)]`} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {inner}
            </a>
          ) : (
            <div key={c.title} className={cls} data-todo="sophie">
              {inner}
            </div>
          );
        })}
      </div>
      <Rise kind="pop" id="form-dang-ky" className="mx-auto mt-8 max-w-[920px] scroll-mt-24 rounded-[var(--r-sheet)] bg-[var(--brand)] p-6 text-[var(--ink)] sm:p-10">
        <h3 className="mb-6 text-2xl">Để lại thông tin, Sophie gọi lại cho bạn</h3>
        <LeadForm />
      </Rise>
      </div>
    </section>
  );
}
