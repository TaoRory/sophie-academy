import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";
import { HallOfFame } from "@/sections/HallOfFame";
import { Reviews } from "@/sections/Reviews";

export const metadata: Metadata = {
  title: "Điểm & Review | Sophie IELTS",
  description: "Bảng vàng học viên và cảm nhận của học viên, phụ huynh về lớp IELTS 1 kèm 1 tại Sophie.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Điểm & Review" }]} title="Điểm &" accent="Review" sub="Kết quả thật và cảm nhận của học viên Sophie, được chia sẻ khi có sự đồng ý." />
      <HallOfFame />
      <Reviews />
      <FinalCta />
    </main>
  );
}
