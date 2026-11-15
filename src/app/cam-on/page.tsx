import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/ui/Mascot";
import { ZaloLink } from "@/components/ui/ZaloLink";

export const metadata: Metadata = { title: "Cảm ơn bạn | Sophie IELTS", robots: { index: false } };

const steps = ["Sophie liên hệ bạn qua điện thoại hoặc Zalo.", "Bạn làm kiểm tra đầu vào.", "Bạn nhận lộ trình riêng."];

export default function ThanksPage() {
  return (
    <>
      <main className="section wrap">
        <Mascot height={140} />
        <h1 className="mt-6 max-w-[16ch]">Sophie đã nhận thông tin của bạn.</h1>
        <ol className="mt-8 grid max-w-[52ch] gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-[var(--r-card)] border border-[var(--line)] p-4 font-semibold">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-white">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <ZaloLink className="btn btn-primary" />
          <Link href="/" className="btn btn-line">
            Về trang chủ
          </Link>
        </div>
      </main>
    </>
  );
}
