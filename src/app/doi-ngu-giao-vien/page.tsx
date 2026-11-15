import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/sections/FinalCta";
import { Teachers } from "@/sections/Teachers";

export const metadata: Metadata = {
  title: "Đội ngũ giáo viên | Sophie IELTS",
  description: "Đội ngũ giáo viên IELTS 8.0 dạy 1 kèm 1 tại Sophie IELTS.",
};

export default function Page() {
  return (
    <main>
      <PageHero crumbs={[{ label: "Đội ngũ giáo viên" }]} title="Đội ngũ" accent="giáo viên" sub="Giáo viên IELTS 8.0, giàu kinh nghiệm và tận tâm với từng học viên." />
      <Teachers />
      <FinalCta />
    </main>
  );
}
