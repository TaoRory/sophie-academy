import type { IconName } from "@/components/ui/Icon";
import type { Audience } from "./types";

// Nội dung trang chủ bố cục kiểu DOL. Chỉ dữ kiện thật (nội quy, mô hình 1-1, giáo viên 8.0); thiếu thì để TODO(sophie).

export const announcement = {
  text: "Học IELTS 1 kèm 1 online: kiểm tra đầu vào rồi nhận lộ trình riêng cho bạn.",
  link: { label: "Đăng ký ngay", href: "#dang-ky" },
};

export const heroPills = ["IELTS 1 kèm 1", "Học online", "Đủ 4 kỹ năng"];

export const heroFacts = [
  { value: "1 kèm 1", label: "1 thầy cô – 1 học viên" },
  { value: "IELTS 8.0", label: "Đội ngũ giáo viên" },
  { value: "Mỗi tháng", label: "Kiểm tra, chỉnh lộ trình" },
];

export const programs: { audience: Audience; icon: IconName; title: string; sub: string }[] = [
  { audience: "hoc-sinh", icon: "book", title: "IELTS cho học sinh", sub: "THCS & THPT, kiểm tra tiến độ mỗi tháng" },
  { audience: "sinh-vien", icon: "target", title: "IELTS cho sinh viên", sub: "Tốt nghiệp, học bổng, du học" },
  { audience: "di-lam", icon: "calendar", title: "IELTS cho người đi làm", sub: "Học buổi tối, lịch linh hoạt" },
];

export const values: { tab: string; tabSub: string; badge: string; title: string; points: string[]; visuals: number[] }[] = [
  {
    tab: "Học 1 kèm 1",
    tabSub: "Cả buổi dành cho bạn",
    badge: "Mô hình học",
    title: "Một giáo viên, một học viên trong suốt buổi học",
    points: ["Học qua Zoom/Meet", "Sửa bài trực tiếp", "Luyện Speaking 1-1", "Không ghép lớp", "Đủ 4 kỹ năng", "Giáo viên IELTS 8.0"],
    visuals: [2],
  },
  {
    tab: "Lộ trình riêng",
    tabSub: "Lập sau kiểm tra đầu vào",
    badge: "Lộ trình cá nhân",
    title: "Lộ trình đi thẳng vào mục tiêu và hạn thi của bạn",
    points: ["Kiểm tra đầu vào", "Thứ tự kỹ năng ưu tiên", "Số buổi mỗi tuần", "Mốc theo từng tháng", "Bài tập sau mỗi buổi", "Luyện đề trước ngày thi"],
    visuals: [0, 1],
  },
  {
    tab: "Kiểm tra mỗi tháng",
    tabSub: "Biết rõ mình tiến tới đâu",
    badge: "Theo dõi tiến độ",
    title: "Mỗi tháng một bài tổng hợp, kết quả quyết định nội dung tháng sau",
    points: ["Bài kiểm tra tổng hợp", "Nhận xét điểm mạnh, điểm yếu", "Chỉnh lộ trình kịp thời", "Biết rõ kỹ năng cần củng cố"],
    visuals: [3],
  },
];

export const onlineFeatures: { icon: IconName; title: string; body: string }[] = [
  { icon: "video", title: "Zoom/Meet 1-1", body: "Chỉ bạn và giáo viên, không ghép buổi với người khác." },
  { icon: "pen", title: "Bài tập mỗi buổi", body: "Hoàn thành đầy đủ; muốn thêm bài thì báo trong nhóm lớp." },
  { icon: "chart", title: "Kiểm tra mỗi tháng", body: "Một bài tổng hợp để theo dõi và chỉnh lộ trình." },
  { icon: "calendar", title: "Đổi lịch linh hoạt", body: "Lịch cố định báo trước 1 tuần, lịch tạm thời báo trước 1 ngày." },
  { icon: "swap", title: "Bảo lưu, chuyển nhượng", body: "Không thể tiếp tục thì bảo lưu theo quy định hoặc chuyển suất học." },
];
