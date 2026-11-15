/** Nét bút vẽ tay của giáo viên. Mỗi loại: viewBox + các path (vẽ theo thứ tự). */
export const PEN = {
  tick: { vb: "0 0 40 32", d: ["M4 18 C 9 21, 12 25, 15 28 C 20 18, 28 9, 37 4"] },
  circle: { vb: "0 0 120 60", d: ["M88 7 C 60 1, 18 5, 8 25 C 0 44, 34 57, 66 55 C 98 53, 119 40, 113 22 C 108 9, 82 3, 58 6"] },
  arrow: { vb: "0 0 80 50", d: ["M4 6 C 18 36, 44 46, 72 34", "M58 27 L 73 34 L 63 46"] },
  star: { vb: "0 0 40 40", d: ["M20 4 L 24 15 L 36 15 L 26 22 L 30 34 L 20 27 L 10 34 L 14 22 L 4 15 L 16 15 Z"] },
  strike: { vb: "0 0 100 12", d: ["M2 8 C 30 4, 70 9, 98 4"] },
  underline: { vb: "0 0 200 12", d: ["M3 8 C 50 3, 120 10, 197 5"] },
  bracket: { vb: "0 0 16 100", d: ["M14 2 C 4 4, 6 30, 4 50 C 6 70, 4 96, 14 98"] },
} as const;

export type PenKind = keyof typeof PEN;
