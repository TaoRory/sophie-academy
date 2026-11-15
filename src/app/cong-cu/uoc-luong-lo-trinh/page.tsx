import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Estimator } from "@/sections/Estimator";
import { FinalCta } from "@/sections/FinalCta";

export const metadata: Metadata = {
  title: "Ước lượng lộ trình IELTS | Sophie IELTS",
  description: "Chọn band hiện tại, mục tiêu và hạn thi để xem thứ tự kỹ năng nên ưu tiên.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Công cụ miễn phí" }, { label: "Ước lượng lộ trình" }]} title="Ước lượng" accent="lộ trình" sub="Chọn nhanh vài thông tin, Sophie gợi ý thứ tự kỹ năng nên ưu tiên." />
      <Estimator />
      <FinalCta />
    </main>
  );
}
