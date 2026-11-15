import type { Skill } from "./types";

export const bands = ["Chưa thi", "3.0–3.5", "4.0–4.5", "5.0–5.5", "6.0–6.5"] as const;
export const targets = ["5.5", "6.0", "6.5", "7.0", "7.5+"] as const;
export const deadlines = ["Trong 3 tháng", "3–6 tháng", "6–12 tháng", "Chưa có hạn"] as const;

// TODO(sophie): bảng quy tắc số tháng (mỗi bước 0.5 band, theo số buổi/tuần). Khi có, đổi status thành "ready" và điền months.
export const estimatorRules = {
  status: "pending" as "pending" | "ready",
  months: {} as Record<string, number>,
};

/** Thứ tự ưu tiên tham khảo. TODO(sophie) duyệt. Writing và Speaking đứng đầu vì cần người sửa trực tiếp nhất. */
export function priorityFor(band: (typeof bands)[number], deadline: (typeof deadlines)[number]): Skill[] {
  if (band === "Chưa thi" || band === "3.0–3.5") return ["listening", "reading", "speaking", "writing"];
  if (deadline === "Trong 3 tháng") return ["writing", "speaking", "reading", "listening"];
  return ["writing", "speaking", "listening", "reading"];
}
