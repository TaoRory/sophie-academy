/** Cấu trúc menu header (kiểu DOL: mục có xổ xuống chia cột). Mọi href là trang thật trong src/app. */
export interface MenuLink {
  label: string;
  href: string;
  desc?: string;
}
export interface MenuGroup {
  title: string;
  links: MenuLink[];
}
export interface MenuItem {
  label: string;
  href?: string; // không có groups: link thường
  groups?: MenuGroup[];
}

export const menu: MenuItem[] = [
  {
    label: "Về Sophie",
    groups: [
      {
        title: "Giới thiệu",
        links: [
          { label: "Phương pháp 1 kèm 1", href: "/ve-sophie", desc: "Một giáo viên, một học viên, lộ trình riêng" },
          { label: "Đội ngũ giáo viên", href: "/doi-ngu-giao-vien", desc: "Giáo viên IELTS 8.0" },
        ],
      },
      {
        title: "Học viên",
        links: [
          { label: "Nội quy học viên", href: "/noi-quy", desc: "Học phí, đổi lịch, bài tập, kiểm tra" },
          { label: "Hỏi đáp", href: "/hoi-dap", desc: "Những câu hỏi thường gặp" },
        ],
      },
    ],
  },
  {
    label: "Chương trình",
    groups: [
      {
        title: "Theo đối tượng",
        links: [
          { label: "Tất cả chương trình", href: "/chuong-trinh" },
          { label: "Học sinh THCS & THPT", href: "/chuong-trinh/hoc-sinh" },
          { label: "Sinh viên", href: "/chuong-trinh/sinh-vien" },
          { label: "Người đi làm", href: "/chuong-trinh/nguoi-di-lam" },
        ],
      },
      {
        title: "Theo kỹ năng",
        links: [
          { label: "Listening", href: "/chuong-trinh/4-ky-nang#listening" },
          { label: "Reading", href: "/chuong-trinh/4-ky-nang#reading" },
          { label: "Writing", href: "/chuong-trinh/4-ky-nang#writing" },
          { label: "Speaking", href: "/chuong-trinh/4-ky-nang#speaking" },
        ],
      },
    ],
  },
  { label: "Điểm & Review", href: "/diem-va-review" },
  {
    label: "Công cụ miễn phí",
    groups: [
      {
        title: "Thử ngay",
        links: [
          { label: "Bạn tìm được lỗi sai không?", href: "/cong-cu/tim-loi-sai", desc: "Trò chơi sửa bài Writing" },
          { label: "Ước lượng lộ trình", href: "/cong-cu/uoc-luong-lo-trinh", desc: "Thứ tự kỹ năng nên ưu tiên" },
        ],
      },
    ],
  },
];

/** Nhãn đường dẫn cho breadcrumb */
export const crumbLabels: Record<string, string> = {
  "ve-sophie": "Phương pháp 1 kèm 1",
  "doi-ngu-giao-vien": "Đội ngũ giáo viên",
  "noi-quy": "Nội quy học viên",
  "hoi-dap": "Hỏi đáp",
  "chuong-trinh": "Chương trình",
  "diem-va-review": "Điểm & Review",
  "cong-cu": "Công cụ miễn phí",
  "dang-ky": "Đăng ký",
};
