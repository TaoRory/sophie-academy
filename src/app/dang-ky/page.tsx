import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";

export const metadata: Metadata = {
  title: "Đăng ký nhận lộ trình riêng | Sophie IELTS",
  description: "Để lại thông tin, Sophie sẽ liên hệ, kiểm tra đầu vào và gửi lộ trình IELTS riêng cho bạn.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Đăng ký" }]} title="Nhận lộ trình" accent="riêng" sub="Điền vài thông tin, Sophie sẽ liên hệ để kiểm tra đầu vào và gửi lộ trình cho bạn." />
      <FinalCta tone="light" />
    </main>
  );
}
