export const comparisonCols = ["Lớp đông", "Gia sư tự do", "Sophie 1-1"] as const;

export const comparisonRows: { label: string; cells: [string, string, string] }[] = [
  { label: "Thời gian được nói và được sửa bài", cells: ["Chia cho cả lớp", "Có, tùy người dạy", "Cả buổi dành cho bạn"] },
  { label: "Lộ trình riêng", cells: ["Chung cho cả lớp", "Tùy người dạy", "Lập sau kiểm tra đầu vào"] },
  { label: "Kiểm tra tiến độ", cells: ["Theo kế hoạch của lớp", "Tùy người dạy", "Một bài tổng hợp mỗi tháng"] },
  { label: "Đổi lịch", cells: ["Khó, lịch cố định", "Thỏa thuận riêng", "Báo trước 1 tuần (cố định) hoặc 1 ngày (tạm thời)"] },
  { label: "Giáo viên", cells: ["Tùy lớp", "Tùy người", "Đội ngũ IELTS 8.0"] },
  { label: "Nội quy và quy trình", cells: ["Có", "Tùy người", "Rõ ràng, công khai"] },
];
