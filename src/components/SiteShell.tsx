import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LeadProvider } from "@/components/LeadContext";

/** Khung chung mọi trang: header (menu), nội dung, footer, nút nổi. LeadProvider giữ lựa chọn của người dùng khi chuyển trang. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LeadProvider>
      <Header />
      {children}
      <Footer />
      <FloatingCta />
    </LeadProvider>
  );
}
