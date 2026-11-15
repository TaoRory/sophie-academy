"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { LogoInline } from "@/components/ui/LogoInline";
import { Mascot } from "@/components/ui/Mascot";
import { menu } from "@/content/menu";
import { site } from "@/content/site";
import { MQ, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * Header dính, menu nhiều mục kiểu DOL (spec: sections/00-header.md):
 * - mục có xổ xuống chia cột: rê chuột (chuột thật) / bấm / Enter mở, Esc đóng, bấm ngoài đóng, đổi trang đóng;
 * - gạch chân cam dưới mục đang mở hoặc đang ở trang đó;
 * - logo nội tuyến, mèo trong logo nhún khi rê chuột; thanh tiến độ cuộn ở mép dưới;
 * - ẩn khi cuộn xuống, hiện khi cuộn lên (không ẩn khi: gần đầu trang, giảm chuyển động, menu đang mở, focus trong header).
 */
export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>(0);

  // Đổi trang: đóng mọi menu (điều chỉnh state ngay trong lúc render, theo khuyến nghị của React)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setDrawer(false);
    setHidden(false);
  }

  const isActive = (i: number) => {
    const m = menu[i];
    if (m.href) return pathname === m.href;
    return !!m.groups?.some((g) => g.links.some((l) => pathname === l.href.split("#")[0]));
  };

  // Ẩn/hiện theo hướng cuộn + thu gọn
  useEffect(() => {
    let lastY = window.scrollY;
    const motionOk = window.matchMedia(MQ.anyMotion).matches;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      setCompact(y > 80);
      if (!motionOk || y < 400 || headerRef.current?.contains(document.activeElement) || headerRef.current?.dataset.menu === "open") setHidden(false);
      else if (dy > 8) setHidden(true);
      else if (dy < -8) setHidden(false);
      if (Math.abs(dy) > 8) lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Thanh tiến độ cuộn (dựng lại khi đổi trang vì chiều cao trang đổi)
  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
        },
      });
      return () => st.kill();
    },
    { dependencies: [pathname] },
  );

  // Menu xổ xuống: Esc đóng (trả focus), bấm ngoài đóng
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const idx = open;
      setOpen(null);
      headerRef.current?.querySelector<HTMLElement>(`[data-menu-btn="${idx}"]`)?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // Ngăn kéo điện thoại: khóa cuộn nền, Esc đóng, giữ focus trong ngăn kéo
  useEffect(() => {
    if (!drawer) return;
    const btn = menuBtn.current;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const focusables = () => drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [];
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
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
  }, [drawer]);

  const hoverOpen = (i: number | null) => {
    window.clearTimeout(closeTimer.current);
    if (window.matchMedia(MQ.fineHover).matches) setOpen(i);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const panel = open !== null ? menu[open] : null;

  return (
    <header
      ref={headerRef}
      data-section="header"
      data-compact={compact || undefined}
      data-hidden={hidden || undefined}
      data-menu={open !== null ? "open" : undefined}
      onFocus={() => setHidden(false)}
      onMouseLeave={hoverClose}
      onMouseEnter={() => window.clearTimeout(closeTimer.current)}
      className="site-header sticky top-0 z-50 border-b border-transparent bg-white data-[compact]:border-[var(--line)]"
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name}, về trang chủ`} className="logo-link flex shrink-0 items-center">
          <LogoInline height={40} />
        </Link>

        <nav aria-label="Chính" className="hidden items-stretch gap-1 self-stretch lg:flex">
          {menu.map((m, i) =>
            m.groups ? (
              <div key={m.label} className="flex" onMouseEnter={() => hoverOpen(i)}>
                <button
                  type="button"
                  data-menu-btn={i}
                  aria-expanded={open === i}
                  aria-controls={`menu-panel-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="menu-item"
                  data-active={isActive(i) || open === i || undefined}
                >
                  {m.label}
                  <Icon name="chevron" size={14} className={`transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
                </button>
              </div>
            ) : (
              <Link key={m.label} href={m.href!} className="menu-item" data-active={isActive(i) || undefined} aria-current={isActive(i) ? "page" : undefined} onMouseEnter={() => hoverOpen(null)}>
                {m.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink className="btn btn-primary" style={{ minHeight: 44, padding: "0 1.1rem" }}>
            <span className="whitespace-nowrap sm:hidden">Nhận lộ trình</span>
            <span className="hidden whitespace-nowrap sm:inline">
              <span className="kit-roll">
                <span>{site.cta.primary}</span>
                <span aria-hidden="true">{site.cta.primary}</span>
              </span>
            </span>
          </CtaLink>
          <button
            ref={menuBtn}
            type="button"
            className="btn btn-line lg:hidden"
            style={{ minHeight: 44, padding: "0 1rem" }}
            aria-expanded={drawer}
            aria-controls="menu-drawer"
            onClick={() => {
              setHidden(false);
              setDrawer(true);
            }}
          >
            Menu
          </button>
        </div>
      </div>

      <span ref={barRef} aria-hidden="true" className="header-progress" />

      {/* Bảng xổ xuống (máy tính) */}
      {panel?.groups && open !== null && (
        <div id={`menu-panel-${open}`} className="mega-panel hidden lg:block" onMouseEnter={() => window.clearTimeout(closeTimer.current)}>
          <div className="wrap grid gap-10 py-8" style={{ gridTemplateColumns: `repeat(${panel.groups.length}, minmax(0, 1fr)) minmax(0, 0.85fr)` }}>
            {panel.groups.map((g) => (
              <div key={g.title}>
                <p className="mb-3 border-b border-[var(--line)] pb-2 text-sm font-extrabold uppercase tracking-wide text-[var(--muted)]">{g.title}</p>
                <ul className="grid gap-1">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={() => setOpen(null)} className="mega-link group block rounded-[var(--r-inner)] px-3 py-2">
                        <span className="flex items-center gap-2 font-bold">
                          {l.label}
                          <Icon name="arrowRight" size={16} className="-translate-x-1 text-[var(--brand-ink)] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                        </span>
                        {l.desc && <span className="mt-0.5 block text-sm text-[var(--muted)]">{l.desc}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="on-ink relative overflow-hidden rounded-[var(--r-card)] bg-[var(--ink)] p-6 text-white">
              <Mascot height={84} className="absolute -bottom-1 right-3" />
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand)]">Học 1 kèm 1</p>
              <p className="mt-2 max-w-[14ch] text-xl font-extrabold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                Nhận lộ trình riêng cho bạn
              </p>
              <CtaLink className="btn btn-primary mt-4" onNavigate={() => setOpen(null)} style={{ minHeight: 40, padding: "0 1rem", fontSize: "0.9375rem" }}>
                {site.cta.primary}
              </CtaLink>
            </div>
          </div>
        </div>
      )}

      {/* Ngăn kéo điện thoại: nhóm mở/đóng như accordion */}
      {drawer && (
        <div id="menu-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Menu" className="on-ink fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[var(--ink)] px-[var(--gutter)] pb-8 pt-4 text-white lg:hidden">
          <div className="flex items-center justify-between" style={{ height: "3rem" }}>
            <Logo variant="navy" height={36} />
            <button type="button" className="btn" style={{ minHeight: 44, padding: "0 1rem", color: "#fff", borderColor: "#fff" }} onClick={() => setDrawer(false)}>
              Đóng
            </button>
          </div>
          <nav aria-label="Menu" className="mt-6 flex flex-col">
            {menu.map((m, i) =>
              m.groups ? (
                <div key={m.label} className="border-b border-white/20">
                  <button type="button" aria-expanded={drawerGroup === i} onClick={() => setDrawerGroup(drawerGroup === i ? null : i)} className="flex w-full items-center justify-between py-4 text-left text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                    {m.label}
                    <Icon name="chevron" size={20} className={`transition-transform duration-200 ${drawerGroup === i ? "rotate-180" : ""}`} />
                  </button>
                  {drawerGroup === i && (
                    <div className="pb-4">
                      {m.groups.map((g) => (
                        <div key={g.title} className="mb-3">
                          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-white/70">{g.title}</p>
                          <ul>
                            {g.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="block py-2 text-lg font-semibold">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={m.label} href={m.href!} className="border-b border-white/20 py-4 text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                  {m.label}
                </Link>
              ),
            )}
          </nav>
          <CtaLink className="btn btn-primary mt-8" onNavigate={() => setDrawer(false)}>
            {site.cta.primary}
          </CtaLink>
        </div>
      )}
    </header>
  );
}
