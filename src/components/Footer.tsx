import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";

export function Footer() {
  const contacts = [
    site.zaloUrl && { label: "Zalo", href: site.zaloUrl },
    site.hotline && { label: site.hotline, href: `tel:${site.hotline.replace(/\s/g, "")}` },
    site.email && { label: site.email, href: `mailto:${site.email}` },
    site.facebook && { label: "Facebook", href: site.facebook },
    site.tiktok && { label: "TikTok", href: site.tiktok },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer data-section="footer" className="px-[var(--gutter)] pb-6">
      <div className="on-ink sheet mx-auto bg-[var(--ink)] text-white" style={{ maxWidth: 1240, padding: "clamp(32px, 5vw, 64px)" }}>
        <Logo variant="navy" height={96} />
        <p className="mt-6 max-w-[34ch] text-2xl font-extrabold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
          {site.slogan}
        </p>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/25 pt-6 text-[0.9375rem]">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contacts.length ? (
              contacts.map((c) => (
                <li key={c.href}>
                  <a className="underline underline-offset-4" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {c.label}
                  </a>
                </li>
              ))
            ) : (
              <li data-todo="sophie">Thông tin liên hệ đang cập nhật</li>
            )}
          </ul>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="underline underline-offset-4" href="/chinh-sach-bao-mat">
              Chính sách bảo mật
            </Link>
            <span>© {site.year} {site.legalName ?? site.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
