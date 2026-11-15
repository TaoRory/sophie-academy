"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { ZaloLink } from "@/components/ui/ZaloLink";
import { site } from "@/content/site";
import { scrollToTarget } from "@/lib/motion";
import { usePathname } from "next/navigation";

const sideTabs = [
  { label: "Điểm & Review", href: "/diem-va-review", cls: "bg-white text-[var(--ink)] border-y border-l border-[var(--line)]" },
  { label: "Phương pháp 1-1", href: "/ve-sophie", cls: "bg-white text-[var(--ink)] border-y border-l border-[var(--line)]" },
  { label: "Nhận lộ trình", href: "/dang-ky", cls: "bg-[var(--ink)] text-white border-y-2 border-l-2 border-[var(--brand)]" },
];

/**
 * Máy tính (kiểu DOL): ba tab dính mép phải + nút lên đầu trang + Zalo (nếu có).
 * Điện thoại: thanh CTA dính đáy, chỉ hiện khi hero đã khuất và chưa tới form.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-section="hero"]');
    const form = document.querySelector('[data-section="dang-ky"]');
    const obs: IntersectionObserver[] = [];
    // Trang không có hero: coi như đã qua hero (thanh CTA điện thoại hiện luôn)
    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
      o.observe(hero);
      obs.push(o);
    } else {
      queueMicrotask(() => setPastHero(true));
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting));
      o.observe(form);
      obs.push(o);
    } else {
      queueMicrotask(() => setAtForm(false));
    }
    return () => obs.forEach((o) => o.disconnect());
  }, [pathname]);

  const show = pastHero && !atForm;

  return (
    <>
      <nav aria-label="Lối tắt" className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 min-[1440px]:flex">
        {sideTabs.map((t) => (
          <Link key={t.href} href={t.href} className={`side-tab w-[92px] rounded-l-[14px] px-3 py-3 text-center text-sm font-extrabold leading-tight ${t.cls}`}>
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
        <button
          type="button"
          aria-label="Lên đầu trang"
          onClick={() => scrollToTarget(0)}
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] transition-opacity duration-200 ${pastHero ? "opacity-100" : "pointer-events-none opacity-0"}`}
          tabIndex={pastHero ? 0 : -1}
        >
          <Icon name="arrowUp" size={20} />
        </button>
        {site.zaloUrl && <ZaloLink className="flex h-12 items-center rounded-full bg-[var(--ink)] px-5 font-extrabold text-white">{site.cta.secondary}</ZaloLink>}
      </div>

      <div
        aria-hidden={!show}
        inert={!show}
        className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[var(--line)] bg-white px-3 pt-2 transition-transform duration-300 lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))", transform: show ? "none" : "translateY(110%)" }}
      >
        <CtaLink className="btn btn-primary flex-1" style={{ minHeight: 48 }}>
          {site.cta.primary}
        </CtaLink>
        <ZaloLink className="btn btn-ink" />
      </div>
    </>
  );
}
