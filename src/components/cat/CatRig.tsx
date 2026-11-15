import { useId } from "react";
import { LOGO_CAT_D, LOGO_CAT_STROKE, LOGO_CAT_TRANSFORM, LOGO_EYE_D } from "./logoCatPaths";

/**
 * Mèo Sophie GỐC (lấy đúng path con mèo trong logo, file .ai) ở hai tư thế, cùng một SVG, toạ độ theo viewBox của logo:
 *
 * 1. `sit`  : đúng silhouette mèo ngồi của logo (quay người sang trái, ngoái đầu nhìn lên phải). Chữ S bị cắt bỏ bằng clipPath,
 *             thay bằng đuôi `sit-tail` cử động được. `sit-paw` là chân trước vẽ chồng khít lên chân gốc để giơ lên vẫy.
 * 2. `walk` : mèo đứng/đi nhìn nghiêng sang phải. ĐẦU là đúng phần đầu của logo (cắt bằng clipPath), thân + 4 chân + đuôi
 *             vẽ cùng phong cách phẳng. Chân xoay quanh hông/vai (svgOrigin) để đi, nhún, nhảy.
 *
 * Mặc định chỉ hiện tư thế ngồi (walk opacity 0) nên không JS vẫn là con mèo gốc. CatCompanion lo mọi chuyển động.
 * Mặt đất (chân chạm) ở y = GROUND; tâm ngang ở x = CENTER_X.
 */
export const CAT_VIEWBOX = { x: 140, y: 312, w: 248, h: 278 } as const;
export const GROUND = 582;
export const CENTER_X = 262;
/** Tỉ lệ từ đáy SVG lên tới mặt đất */
export const CAT_FEET_RATIO = (CAT_VIEWBOX.y + CAT_VIEWBOX.h - GROUND) / CAT_VIEWBOX.h;
export const CAT_ASPECT = CAT_VIEWBOX.w / CAT_VIEWBOX.h;

/** Khớp xoay (toạ độ viewBox) cho svgOrigin */
export const JOINT = {
  sitTail: "300 572",
  sitPaw: "198 500",
  walkHead: "343 494",
  walkTail: "190 500",
  walkTorso: "255 540",
  legNF: "318 532",
  legFF: "309 532",
  legNB: "204 532",
  legFB: "213 532",
} as const;

const ORANGE = "#F28F20";
const ORANGE_FAR = "#D9771A";
const INK = "#232A60";

function Leg({ part, x, color, hind }: { part: string; x: number; color: string; hind?: boolean }) {
  // chân xoay quanh khớp (x, 532): đùi (sau) / bả vai (trước) to ở trên, cẳng thon xuống mặt đất, bàn chân bo tròn hướng về trước
  return (
    <g data-part={part}>
      {hind ? <ellipse cx={x + 4} cy={530} rx="20" ry="22" fill={color} /> : <ellipse cx={x} cy={528} rx="13" ry="16" fill={color} />}
      <path d={`M${x} 532 L ${x - 1} 574`} stroke={color} strokeWidth={hind ? 14 : 13} strokeLinecap="round" fill="none" />
      <ellipse cx={x + 3} cy={577} rx="10" ry="5.5" fill={color} />
    </g>
  );
}

export function CatRig({ size = 120, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipSit = `cat-sit-${uid}`;
  const clipHead = `cat-head-${uid}`;
  const { x, y, w, h } = CAT_VIEWBOX;

  return (
    <svg
      viewBox={`${x} ${y} ${w} ${h}`}
      width={Math.round(size * CAT_ASPECT)}
      height={size}
      className={className}
      style={{ overflow: "visible", ...style }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Cắt bỏ chữ S, giữ con mèo ngồi */}
        <clipPath id={clipSit} clipPathUnits="userSpaceOnUse">
          <path d="M150 340 L 284 340 L 284 468 L 309 503 L 309 551 L 301 551 L 301 600 L 150 600 Z" />
        </clipPath>
        {/* Chỉ lấy phần đầu (trên cổ) để ghép vào mèo đi */}
        <clipPath id={clipHead} clipPathUnits="userSpaceOnUse">
          <path d="M168 350 L 268 350 L 268 431 L 168 431 Z" />
        </clipPath>
      </defs>

      <ellipse data-part="shadow" cx={CENTER_X} cy={GROUND + 2} rx="62" ry="5" fill={INK} opacity="0.1" />

      {/* ---------- Tư thế ngồi: mèo gốc của logo ---------- */}
      <g data-part="sit">
        <g data-part="sit-tail">
          <path d="M292 574 C 318 578, 338 570, 344 552 C 349 536, 342 524, 330 522" fill="none" stroke={ORANGE} strokeWidth="14" strokeLinecap="round" />
        </g>
        <g clipPath={`url(#${clipSit})`}>
          <path d={LOGO_CAT_D} transform={LOGO_CAT_TRANSFORM} fill={ORANGE} stroke={ORANGE} strokeWidth={LOGO_CAT_STROKE} />
        </g>
        <path d={LOGO_EYE_D} fill={INK} />
        <g data-part="sit-paw">
          <path d="M198 502 L 191 566" stroke={ORANGE} strokeWidth="19" strokeLinecap="round" fill="none" />
          <circle cx="191" cy="568" r="10" fill={ORANGE} />
        </g>
      </g>

      {/* ---------- Tư thế đứng / đi: đầu gốc + thân, chân, đuôi ---------- */}
      <g data-part="walk" opacity="0" pointerEvents="none">
        <g data-part="walk-tail">
          <path d="M190 500 C 162 494, 150 466, 160 444 C 167 430, 163 416, 152 412" fill="none" stroke={ORANGE} strokeWidth="12" strokeLinecap="round" />
        </g>
        <Leg part="leg-fb" x={213} color={ORANGE_FAR} hind />
        <Leg part="leg-ff" x={309} color={ORANGE_FAR} />
        <g data-part="walk-torso">
          <path d="M186 516 C 184 494, 200 484, 226 486 C 252 488, 276 480, 302 478 C 330 476, 348 494, 346 518 C 344 540, 328 548, 306 546 C 280 544, 258 548, 232 548 C 204 548, 188 538, 186 516 Z" fill={ORANGE} />
        </g>
        <Leg part="leg-nb" x={204} color={ORANGE} hind />
        <Leg part="leg-nf" x={318} color={ORANGE} />
        <g data-part="walk-head">
          {/* đầu gốc của logo, dời để cổ (y 431) nằm trên ngực thân */}
          <g transform="translate(118 64)">
            <g clipPath={`url(#${clipHead})`}>
              <path d={LOGO_CAT_D} transform={LOGO_CAT_TRANSFORM} fill={ORANGE} stroke={ORANGE} strokeWidth={LOGO_CAT_STROKE} />
            </g>
            <path d={LOGO_EYE_D} fill={INK} />
          </g>
        </g>
      </g>

      <g data-part="bubble" opacity="0" pointerEvents="none">
        <rect x="192" y="314" width="96" height="34" rx="17" fill={INK} />
        <path d="M226 347 L 222 360 L 238 347 Z" fill={INK} />
        <text x="240" y="337" textAnchor="middle" fontFamily="var(--font-display), system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#fff">
          Hello!
        </text>
      </g>
    </svg>
  );
}
