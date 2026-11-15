import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { audiencePages } from "@/content/programs";
import { PageHero } from "@/components/ui/PageHero";
import { AudiencePains } from "@/sections/AudiencePains";
import { FinalCta } from "@/sections/FinalCta";
import { HowOnline } from "@/sections/HowOnline";
import { Journey } from "@/sections/Journey";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(audiencePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = audiencePages[slug];
  if (!p) return {};
  return { title: `IELTS 1 kèm 1 cho ${p.crumb.toLowerCase()} | Sophie IELTS`, description: p.sub };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = audiencePages[slug];
  if (!p) notFound();
  return (
    <main>
      <PageHero crumbs={[{ label: "Chương trình", href: "/chuong-trinh" }, { label: p.crumb }]} title={p.title} accent={p.accent} sub={p.sub} />
      <AudiencePains audience={p.audience} />
      <HowOnline />
      <Journey />
      <FinalCta />
    </main>
  );
}
