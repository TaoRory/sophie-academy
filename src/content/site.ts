/** Thông tin chung của site. Mọi TODO(sophie) là dữ liệu chưa có: không điền giả. */
export const site = {
  name: "Sophie IELTS",
  url: "https://sophie-ielts.vn", // TODO(sophie): domain thật
  year: 2026,
  slogan: "Học nghiêm túc – Tiến bộ từng ngày – Chinh phục mục tiêu IELTS",
  cta: { primary: "Nhận lộ trình riêng", secondary: "Chat Zalo" },
  zaloUrl: null as string | null, // TODO(sophie): https://zalo.me/<số hoặc OA>
  hotline: null as string | null, // TODO(sophie)
  email: null as string | null, // TODO(sophie)
  facebook: null as string | null, // TODO(sophie)
  tiktok: null as string | null, // TODO(sophie)
  legalName: null as string | null, // TODO(sophie): tên pháp nhân cho footer và chính sách
} as const;

export const nav = [
  { label: "Bảng vàng", href: "#bang-vang" },
  { label: "Vì sao 1-1", href: "#gia-tri" },
  { label: "Lộ trình", href: "#lo-trinh" },
  { label: "Giáo viên", href: "#giao-vien" },
  { label: "Hỏi đáp", href: "#hoi-dap" },
] as const;
