import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";
import { HowOnline } from "@/sections/HowOnline";
import { Journey } from "@/sections/Journey";
import { Statement } from "@/sections/Statement";
import { Values } from "@/sections/Values";

export const metadata: Metadata = {
  title: "Phương pháp 1 kèm 1 | Sophie IELTS",
  description: "Một giáo viên, một học viên, lộ trình riêng và kiểm tra tổng hợp mỗi tháng: cách Sophie IELTS dạy IELTS online.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Phương pháp 1 kèm 1" }]} title="Phương pháp" accent="1 kèm 1" sub="Cả buổi học dành cho bạn: giáo viên sửa bài trực tiếp, lộ trình riêng và một bài kiểm tra tổng hợp mỗi tháng." />
      <Values />
      <Statement />
      <HowOnline />
      <Journey />
      <FinalCta />
    </main>
  );
}
