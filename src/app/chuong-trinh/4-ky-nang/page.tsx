import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";
import { SkillBlocks } from "@/sections/SkillBlocks";

export const metadata: Metadata = {
  title: "4 kỹ năng IELTS | Sophie IELTS",
  description: "Listening, Reading, Writing, Speaking: học từng kỹ năng 1 kèm 1 với giáo viên IELTS 8.0.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Chương trình", href: "/chuong-trinh" }, { label: "4 kỹ năng" }]} title="Học đủ" accent="4 kỹ năng" sub="Listening, Reading, Writing và Speaking, học 1 kèm 1 theo lộ trình của riêng bạn." />
      <SkillBlocks />
      <FinalCta />
    </main>
  );
}
