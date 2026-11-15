import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/content/site";

/** Footer kiểu DOL: nền navy tràn ngang, nhiều cột. */
export function Footer() {
  const contacts = [
    site.zaloUrl && { label: "Zalo", value: "Nhắn tin Sophie", href: site.zaloUrl },
    site.hotline && { label: "Hotline", value: site.hotline, href: `tel:${site.hotline.replace(/\s/g, "")}` },
    site.email && { label: "Email", value: site.email, href: `mailto:${site.email}` },
  ].filter(Boolean) as { label: string; value: string; href: string }[];
  const socials = [site.facebook && { label: "Facebook", href: site.facebook }, site.tiktok && { label: "TikTok", href: site.tiktok }].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer data-section="footer" className="on-ink bg-[var(--ink)] text-white">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[4fr_3fr_3fr_3fr]">
        <div>
          <Logo variant="navy" height={64} />
          <p className="mt-4 max-w-[34ch] font-semibold">{site.slogan}</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white/80">Liên hệ</p>
          {contacts.length ? (
            <ul className="grid gap-2">
              {contacts.map((c) => (
                <li key={c.href}>
                  <span className="font-bold">{c.label}: </span>
                  <a className="underline-offset-4 hover:underline" href={c.href}>{c.value}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p data-todo="sophie">Thông tin liên hệ đang cập nhật</p>
          )}
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-3">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-white/40 px-3 py-1 text-sm font-semibold hover:bg-white/10">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white/80">Khám phá</p>
          <ul className="grid gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="underline-offset-4 hover:underline" href={`/${n.href}`}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white/80">Đăng ký</p>
          <ul className="grid gap-2">
            <li><Link className="underline-offset-4 hover:underline" href="/#dang-ky">{site.cta.primary}</Link></li>
            <li><Link className="underline-offset-4 hover:underline" href="/#uoc-luong">Ước lượng lộ trình</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-sm lg:pr-24">
          <span>© {site.year} {site.legalName ?? site.name}. All rights reserved.</span>
          <Link className="underline-offset-4 hover:underline" href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
        </div>
      </div>
    </footer>
  );
}
