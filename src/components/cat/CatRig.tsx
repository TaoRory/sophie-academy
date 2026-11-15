/**
 * Mèo Sophie tách lớp (vẽ tay theo dáng mèo vẫy tay trên ảnh bìa; thay bằng file của designer khi có).
 * Chỉ là hình: animation nằm ở CatCompanion. Mỗi bộ phận là <g data-part> để GSAP xoay quanh khớp (svgOrigin):
 *   tail  gốc đuôi (136 196)   arm  vai (80 146)   head  cổ (100 128)   eyes  tâm mắt (100 92)
 * viewBox cao hơn thân để có chỗ cho bong bóng "Hello!" phía trên. Chân chạm đáy ở y ≈ 210 (FEET_RATIO).
 */
export const CAT_VIEWBOX = { x: -6, y: -46, w: 212, h: 262 } as const;
/** Tỉ lệ từ đáy SVG lên tới chân mèo, để đặt chân đúng mép khối đậu */
export const CAT_FEET_RATIO = (CAT_VIEWBOX.y + CAT_VIEWBOX.h - 210) / CAT_VIEWBOX.h;
export const CAT_ASPECT = CAT_VIEWBOX.w / CAT_VIEWBOX.h;

const ORANGE = "#F28F20";
const ORANGE_DARK = "#D9771A";
const ORANGE_LIGHT = "#F9BE7C";
const INK = "#232A60";

export function CatRig({ size = 110, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
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
      <ellipse data-part="shadow" cx="102" cy="212" rx="52" ry="6" fill={INK} opacity="0.12" />

      <g data-part="tail">
        <path d="M134 198 C 170 200, 188 178, 176 156 C 166 138, 174 118, 194 118" fill="none" stroke={ORANGE} strokeWidth="17" strokeLinecap="round" />
      </g>

      <g data-part="body">
        <path d="M62 210 C 56 176, 62 146, 80 134 C 92 126, 108 126, 120 134 C 138 146, 144 176, 138 210 Z" fill={ORANGE} />
        {/* chân trước: hai vạch đậm + bàn chân */}
        <path d="M89 172 L 89 206 M111 172 L 111 206" stroke={ORANGE_DARK} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="82" cy="208" rx="13" ry="6" fill={ORANGE} />
        <ellipse cx="118" cy="208" rx="13" ry="6" fill={ORANGE} />
        <ellipse cx="100" cy="176" rx="15" ry="20" fill={ORANGE_LIGHT} opacity="0.55" />
      </g>

      <g data-part="arm">
        <path d="M80 146 C 70 160, 66 176, 68 190" fill="none" stroke={ORANGE} strokeWidth="17" strokeLinecap="round" />
        <circle cx="68" cy="192" r="10.5" fill={ORANGE} />
        <path d="M63 194 L 63 198 M68 195 L 68 199 M73 194 L 73 198" stroke={ORANGE_DARK} strokeWidth="2" strokeLinecap="round" />
      </g>

      <g data-part="head">
        {/* tai */}
        <path d="M62 84 L 64 40 Q 66 34 72 38 L 98 60 Z" fill={ORANGE} stroke={ORANGE} strokeWidth="6" strokeLinejoin="round" />
        <path d="M138 84 L 136 40 Q 134 34 128 38 L 102 60 Z" fill={ORANGE} stroke={ORANGE} strokeWidth="6" strokeLinejoin="round" />
        <path d="M70 70 L 71 50 L 86 62 Z" fill={ORANGE_LIGHT} />
        <path d="M130 70 L 129 50 L 114 62 Z" fill={ORANGE_LIGHT} />
        <ellipse cx="100" cy="92" rx="45" ry="38" fill={ORANGE} />
        {/* má */}
        <ellipse cx="73" cy="106" rx="7" ry="4.5" fill={ORANGE_LIGHT} />
        <ellipse cx="127" cy="106" rx="7" ry="4.5" fill={ORANGE_LIGHT} />
        <g data-part="eyes">
          <circle cx="84" cy="92" r="6" fill={INK} />
          <circle cx="116" cy="92" r="6" fill={INK} />
          <circle cx="86" cy="89.5" r="1.8" fill="#fff" />
          <circle cx="118" cy="89.5" r="1.8" fill="#fff" />
        </g>
        <path d="M96 101 Q 100 98 104 101 Q 100 106 96 101 Z" fill={INK} />
        <path d="M91 107 Q 95.5 113 100 107 Q 104.5 113 109 107" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* ria */}
        <path d="M58 98 L 44 95 M58 104 L 45 106 M142 98 L 156 95 M142 104 L 155 106" stroke={ORANGE_DARK} strokeWidth="2" strokeLinecap="round" />
      </g>

      <g data-part="bubble" opacity="0" pointerEvents="none">
        <rect x="-2" y="-44" width="96" height="34" rx="17" fill={INK} />
        <path d="M40 -11 L 50 2 L 54 -11 Z" fill={INK} />
        <text x="46" y="-21" textAnchor="middle" fontFamily="var(--font-display), system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#fff">
          Hello!
        </text>
      </g>
    </svg>
  );
}
