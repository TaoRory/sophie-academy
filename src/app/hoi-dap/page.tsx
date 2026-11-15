import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";

export const metadata: Metadata = {
  title: "Hỏi đáp | Sophie IELTS",
  description: "Giải đáp học phí, đổi lịch, bảo lưu, bài tập và kiểm tra hàng tháng khi học IELTS 1 kèm 1 tại Sophie.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Hỏi đáp" }]} title="Hỏi đáp" accent="thường gặp" sub="Chưa thấy câu bạn cần? Để lại thông tin ở cuối trang, Sophie sẽ trả lời bạn." />
      <Faq />
      <FinalCta />
    </main>
  );
}
