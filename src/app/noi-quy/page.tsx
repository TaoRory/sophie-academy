import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";
import { NoiQuy } from "@/sections/NoiQuy";

export const metadata: Metadata = {
  title: "Nội quy học viên | Sophie IELTS",
  description: "Nội quy học viên Sophie IELTS: học phí, hình thức học, đổi lịch, bài tập, kiểm tra hàng tháng và thái độ học tập.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Nội quy học viên" }]} title="Nội quy" accent="học viên" sub="Những quy định giúp quá trình học hiệu quả và bảo vệ quyền lợi của tất cả học viên." />
      <NoiQuy />
      <FinalCta />
    </main>
  );
}
