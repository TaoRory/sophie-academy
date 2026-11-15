import type { IconName } from "@/components/ui/Icon";

/** Nội quy học viên Sophie IELTS: chép nguyên ý từ ảnh "Nội quy học viên" của brand. */
export const noiQuy: { title: string; icon: IconName; points: string[] }[] = [
  {
    title: "Học phí",
    icon: "book",
    points: [
      "Học phí sau khi đã đóng không được hoàn lại.",
      "Nếu không thể tiếp tục học, học viên có thể lựa chọn: bảo lưu khóa học theo quy định của Sophie IELTS; chuyển suất học cho người khác sau khi thông báo với Sophie IELTS.",
    ],
  },
  {
    title: "Hình thức học",
    icon: "video",
    points: ["Lớp học được tổ chức theo hình thức 1 giáo viên – 1 học viên.", "Học viên không tự học chung hoặc ghép buổi với người khác."],
  },
  {
    title: "Đổi lịch học",
    icon: "calendar",
    points: [
      "Đổi lịch cố định: báo trước ít nhất 1 tuần.",
      "Đổi lịch tạm thời: báo trước ít nhất 1 ngày.",
      "Việc đổi lịch cần được thông báo trong nhóm lớp để giáo viên có thể chủ động sắp xếp.",
    ],
  },
  {
    title: "Bài tập",
    icon: "pen",
    points: [
      "Học viên cần hoàn thành đầy đủ bài tập được giao.",
      "Nếu muốn nhận thêm bài tập, học viên có thể báo trong nhóm lớp để giáo viên chuẩn bị thêm.",
      "Chủ động làm bài và luyện tập ngoài giờ học là một phần quan trọng trong quá trình cải thiện IELTS.",
    ],
  },
  {
    title: "Kiểm tra hàng tháng",
    icon: "chart",
    points: [
      "Mỗi tháng, học viên sẽ thực hiện 01 bài kiểm tra tổng hợp các kiến thức và kỹ năng đã học.",
      "Kết quả kiểm tra sẽ được sử dụng để theo dõi tiến độ và điều chỉnh nội dung học trong thời gian tiếp theo.",
    ],
  },
  {
    title: "Thái độ học tập",
    icon: "target",
    points: [
      "Đi học đúng giờ, chuẩn bị đầy đủ trước mỗi buổi học.",
      "Chủ động trao đổi với giáo viên khi chưa hiểu bài hoặc gặp khó khăn trong quá trình học.",
      "Nghiêm túc thực hiện các yêu cầu và bài tập được giao.",
    ],
  },
];
