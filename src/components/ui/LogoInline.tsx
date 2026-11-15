import { LOGO_INNER, LOGO_VIEWBOX } from "./logoMarkup";

/** Logo vector nội tuyến: nhóm [data-logo-cat] (mèo + chữ S) animate được bằng CSS (xem tokens.css: .logo-link). */
export function LogoInline({ height = 40, className }: { height?: number; className?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      height={height}
      width={Math.round((height * 620) / 280)}
      className={className}
      role="img"
      aria-label="Sophie IELTS"
      style={{ overflow: "visible" }}
      dangerouslySetInnerHTML={{ __html: LOGO_INNER }}
    />
  );
}
