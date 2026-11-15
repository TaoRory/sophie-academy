"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { LogoInline } from "@/components/ui/LogoInline";
import { nav, site } from "@/content/site";
import { MQ, ScrollTrigger, scrollToTarget, useGSAP } from "@/lib/motion";

/**
 * Header dính (spec: sections/00-header.md):
 * - logo nội tuyến, mèo trong logo nhún khi rê chuột (CSS);
 * - viên chỉ mục trượt tới mục đang xem / đang rê (clip-path, CSS transition);
 * - thanh tiến độ cuộn ở mép dưới (scaleX);
 * - ẩn khi cuộn xuống, hiện khi cuộn lên (không ẩn khi: gần đầu trang, menu mở, focus trong header, đang ở cảnh ghim Lộ trình, giảm chuyển động).
 */
export function Header() {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const suppressHideUntil = useRef(0);

  // Ẩn/hiện theo hướng cuộn + thu gọn
  useEffect(() => {
    let lastY = window.scrollY;
    const motionOk = window.matchMedia(MQ.anyMotion).matches;
    const pinActive = () => {
      const pin = document.querySelector<HTMLElement>('#lo-trinh[data-live="true"]');
      if (!pin) return false;
      const r = pin.getBoundingClientRect();
      return r.top <= 80 && r.bottom >= window.innerHeight - 10;
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      setCompact(y > 80);
      if (!motionOk || y < 400 || pinActive() || headerRef.current?.contains(document.activeElement)) setHidden(false);
      else if (dy > 8 && performance.now() > suppressHideUntil.current) setHidden(true);
      else if (dy < -8) setHidden(false);
      if (Math.abs(dy) > 8) lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Thanh tiến độ cuộn
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
    });
    return () => st.kill();
  });

  // Mục đang xem
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Viên chỉ mục: lộ đúng mục bằng clip-path (ghi thẳng vào DOM, CSS lo phần chuyển động)
  const target = hover ?? (active ? `#${active}` : null);
  useEffect(() => {
    const navEl = navRef.current;
    const pillEl = pillRef.current;
    if (!navEl || !pillEl) return;
    const link = target ? navEl.querySelector<HTMLElement>(`a[href="${target}"]`) : null;
    if (!link) {
      pillEl.style.opacity = "0";
      return;
    }
    const L = link.offsetLeft;
    const R = navEl.clientWidth - (link.offsetLeft + link.offsetWidth);
    pillEl.style.clipPath = `inset(0px ${R}px 0px ${L}px round 999px)`;
    pillEl.style.opacity = "1";
  }, [target]);

  // Menu điện thoại: khóa cuộn nền, Esc đóng, giữ focus trong ngăn kéo
  useEffect(() => {
    if (!open) return;
    const btn = menuBtn.current;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const focusables = () => drawer.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [];
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const els = [...focusables()];
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    e.preventDefault();
    setOpen(false);
    setHidden(false);
    suppressHideUntil.current = e.timeStamp + 1500;
    requestAnimationFrame(() => scrollToTarget(el, { offset: -64 }));
  };

  return (
    <header
      ref={headerRef}
      data-section="header"
      data-compact={compact || undefined}
      data-hidden={hidden || undefined}
      onFocus={() => setHidden(false)}
      className="site-header sticky top-0 z-50 border-b border-transparent bg-white data-[compact]:border-[var(--line)]"
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#" aria-label={`${site.name}, về đầu trang`} className="logo-link flex shrink-0 items-center">
          <LogoInline height={40} />
        </a>

        <nav ref={navRef} aria-label="Chính" className="relative hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
          <span ref={pillRef} aria-hidden="true" className="nav-pill" style={{ opacity: 0 }} />
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => go(e, n.href)}
              onMouseEnter={() => setHover(n.href)}
              onFocus={() => setHover(n.href)}
              onBlur={() => setHover(null)}
              aria-current={active === n.href.slice(1) ? "true" : undefined}
              className="relative z-10 rounded-full px-3.5 py-2 font-semibold text-[var(--ink)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#dang-ky" onClick={(e) => go(e, "#dang-ky")} className="btn btn-primary" style={{ minHeight: 44, padding: "0 1.1rem" }}>
            <span className="whitespace-nowrap sm:hidden">Nhận lộ trình</span>
            <span className="hidden whitespace-nowrap sm:inline">
              <span className="kit-roll">
                <span>{site.cta.primary}</span>
                <span aria-hidden="true">{site.cta.primary}</span>
              </span>
            </span>
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="btn btn-line lg:hidden"
            style={{ minHeight: 44, padding: "0 1rem" }}
            aria-expanded={open}
            aria-controls="menu-drawer"
            onClick={() => {
              setHidden(false);
              setOpen(true);
            }}
          >
            Menu
          </button>
        </div>
      </div>

      <span ref={barRef} aria-hidden="true" className="header-progress" />

      {open && (
        <div id="menu-drawer" ref={drawer} role="dialog" aria-modal="true" aria-label="Menu" className="on-ink fixed inset-0 z-50 flex flex-col bg-[var(--ink)] px-[var(--gutter)] pb-8 pt-4 text-white lg:hidden">
          <div className="flex items-center justify-between" style={{ height: "3rem" }}>
            <Logo variant="navy" height={36} />
            <button type="button" className="btn" style={{ minHeight: 44, padding: "0 1rem", color: "#fff", borderColor: "#fff" }} onClick={() => setOpen(false)}>
              Đóng
            </button>
          </div>
          <nav aria-label="Menu" className="mt-10 flex flex-col gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="border-b border-white/20 py-4 text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#dang-ky" onClick={(e) => go(e, "#dang-ky")} className="btn btn-primary mt-auto">
            {site.cta.primary}
          </a>
        </div>
      )}
    </header>
  );
}
