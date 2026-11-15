import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Nunito } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { motionBootScript } from "@/lib/motion-boot";
import "./globals.css";

const display = Nunito({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Sophie IELTS | IELTS 1 kèm 1 online, giáo viên 8.0 dạy riêng bạn",
  description:
    "Học IELTS 1 kèm 1 online cùng giáo viên 8.0. Lộ trình riêng, kiểm tra tổng hợp mỗi tháng để chỉnh lại. Nhận lộ trình riêng cho bạn.",
  openGraph: { title: "Sophie IELTS", description: site.slogan, locale: "vi_VN", type: "website" },
};

export const viewport: Viewport = { themeColor: "#232a60" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        {children}
        <MotionProvider />
      </body>
    </html>
  );
}
