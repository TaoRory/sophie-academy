import { site } from "@/content/site";

/** Link Zalo. Chưa có số/OA thật thì không render gì (không dẫn tới link giả). */
export function ZaloLink({ className, children = site.cta.secondary }: { className?: string; children?: React.ReactNode }) {
  if (!site.zaloUrl) return null;
  return (
    <a className={className} href={site.zaloUrl} target="_blank" rel="noopener noreferrer" data-event="zalo_click">
      {children}
    </a>
  );
}
