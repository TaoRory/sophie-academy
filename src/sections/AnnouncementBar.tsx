"use client";

import { useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { announcement } from "@/content/home";

/** Dải thông báo trên cùng (kiểu DOL), đóng được. */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-[var(--brand)] text-[var(--ink)]">
      <div className="wrap flex min-h-11 items-center justify-center gap-3 py-2 text-center text-[0.9375rem]">
        <p className="font-semibold">
          {announcement.text}{" "}
          <CtaLink className="whitespace-nowrap font-extrabold underline underline-offset-4">
            {announcement.link.label}
          </CtaLink>
        </p>
        <button type="button" onClick={() => setOpen(false)} aria-label="Đóng thông báo" className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-white/40">
          <Icon name="close" size={18} />
        </button>
      </div>
    </div>
  );
}
