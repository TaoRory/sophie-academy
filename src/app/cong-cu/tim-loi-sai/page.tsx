import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";
import { FixTheMistake } from "@/sections/FixTheMistake";

export const metadata: Metadata = {
  title: "Bạn tìm được lỗi sai không? | Sophie IELTS",
  description: "Thử làm học viên của Sophie: tìm lỗi sai trong câu Writing và xem giáo viên sửa bài.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Công cụ miễn phí" }, { label: "Tìm lỗi sai" }]} title="Bạn tìm được" accent="lỗi sai không?" sub="Một phút thử làm học viên của Sophie: bấm vào từ bạn nghĩ là sai." />
      <FixTheMistake />
      <FinalCta />
    </main>
  );
}
