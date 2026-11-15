"use client";

import Link from "next/link";
import { scrollToTarget } from "@/lib/motion";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & { onNavigate?: () => void };

/**
 * Link tới /dang-ky. Trang có sẵn form (#dang-ky) thì cuộn tới đó thay vì chuyển trang.
 * Nhận mọi thuộc tính của <Link> (className, style, data-*).
 */
export function CtaLink({ onNavigate, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href="/dang-ky"
      onClick={(e) => {
        onClick?.(e);
        onNavigate?.();
        const el = document.querySelector<HTMLElement>("#dang-ky");
        if (!el) return;
        e.preventDefault();
        scrollToTarget(el, { offset: -64 });
      }}
    />
  );
}
