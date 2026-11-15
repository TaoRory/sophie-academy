"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/content/site";
import { scrollToTarget } from "@/lib/motion";

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mở: khóa cuộn nền, Esc đóng, giữ focus trong ngăn kéo.
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
    if (!el) return; // phần chưa dựng: để trình duyệt xử lý
    e.preventDefault();
    setOpen(false);
    // chờ ngăn kéo trả lại overflow rồi mới cuộn
    requestAnimationFrame(() => scrollToTarget(el, { offset: -64 }));
  };

  return (
    <header
      data-section="header"
      data-compact={compact || undefined}
      className="sticky top-0 z-50 border-b border-transparent bg-white transition-[border-color,box-shadow] duration-200 data-[compact]:border-[var(--line)]"
    >
      <div className="wrap flex items-center justify-between gap-4" style={{ height: compact ? "3.5rem" : "4rem", transition: "height .2s ease-out" }}>
        <a href="#" aria-label={`${site.name}, về đầu trang`} className="flex shrink-0 items-center">
          <Logo height={compact ? 34 : 40} priority />
        </a>

        <nav aria-label="Chính" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="font-semibold text-[var(--ink)] hover:underline underline-offset-4 decoration-2 decoration-[var(--brand)]">
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
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>

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
