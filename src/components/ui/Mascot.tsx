import Image from "next/image";

/** Mèo ngồi + đuôi chữ S tách từ logo gốc (vector). Mèo vẫy tay chờ Sophie gửi file. */
export function Mascot({ height = 180, className }: { height?: number; className?: string }) {
  return <Image src="/brand/mascot-mark.svg" alt="" aria-hidden width={Math.round((height * 246) / 214)} height={height} className={className} unoptimized />;
}
