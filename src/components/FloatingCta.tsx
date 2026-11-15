"use client";

import { useEffect, useState } from "react";
import { ZaloLink } from "@/components/ui/ZaloLink";
import { site } from "@/content/site";
import { scrollToTarget } from "@/lib/motion";

/** Nút Zalo nổi (máy tính) + thanh CTA dính đáy (điện thoại, chỉ hiện khi hero đã khuất và chưa tới form). */
export function FloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-section="hero"]');
    const form = document.querySelector('[data-section="dang-ky"]');
    const obs: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
      o.observe(hero);
      obs.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting));
      o.observe(form);
      obs.push(o);
    }
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !atForm;

  const goForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.querySelector<HTMLElement>("#dang-ky");
    if (!el) return;
    e.preventDefault();
    scrollToTarget(el, { offset: -64 });
  };

  return (
    <>
      {site.zaloUrl && (
        <ZaloLink className="fixed bottom-6 right-6 z-40 hidden h-14 items-center rounded-full bg-[var(--ink)] px-5 font-extrabold text-white shadow-none lg:flex">
          {site.cta.secondary}
        </ZaloLink>
      )}
      <div
        aria-hidden={!show}
        inert={!show}
        data-cat-perch-mobile="right"
        className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[var(--line)] bg-white px-3 pt-2 transition-transform duration-300 lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))", transform: show ? "none" : "translateY(110%)" }}
      >
        <a href="#dang-ky" onClick={goForm} className="btn btn-primary flex-1" style={{ minHeight: 48 }}>
          {site.cta.primary}
        </a>
        <ZaloLink className="btn btn-ink" />
      </div>
    </>
  );
}
