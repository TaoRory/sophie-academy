import Image from "next/image";

type Variant = "light" | "navy" | "orange";

/** Logo vector từ file .ai gốc. Tỉ lệ viewBox 620:280. */
export function Logo({ variant = "light", height = 40, priority = false }: { variant?: Variant; height?: number; priority?: boolean }) {
  return (
    <Image
      src={`/brand/logo-on-${variant}.svg`}
      alt="Sophie IELTS"
      width={Math.round((height * 620) / 280)}
      height={height}
      priority={priority}
      unoptimized
    />
  );
}
