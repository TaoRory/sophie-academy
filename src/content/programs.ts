import type { Audience, Skill } from "./types";

export const audiencePages: Record<string, { audience: Audience; title: string; accent: string; sub: string; crumb: string }> = {
  "hoc-sinh": {
    audience: "hoc-sinh",
    crumb: "Học sinh THCS & THPT",
    title: "IELTS 1 kèm 1 cho",
    accent: "học sinh",
    sub: "Giáo viên IELTS 8.0 dạy riêng từng em qua Zoom/Meet. Mỗi tháng có một bài kiểm tra tổng hợp để nhìn lại tiến độ và chỉnh lộ trình.",
  },
  "sinh-vien": {
    audience: "sinh-vien",
    crumb: "Sinh viên",
    title: "IELTS 1 kèm 1 cho",
    accent: "sinh viên",
    sub: "Cho mục tiêu tốt nghiệp, học bổng hay du học: lộ trình đi thẳng vào mục tiêu và hạn thi của bạn.",
  },
  "nguoi-di-lam": {
    audience: "di-lam",
    crumb: "Người đi làm",
    title: "IELTS 1 kèm 1 cho",
    accent: "người đi làm",
    sub: "Học 1-1 online, bạn và giáo viên thỏa thuận khung giờ. Đổi lịch tạm thời chỉ cần báo trước 1 ngày.",
  },
};

// TODO(sophie): duyệt nội dung 4 kỹ năng (mô tả chung, chưa phải giáo trình chính thức của Sophie).
export const skillPages: { id: Skill; title: string; lead: string; points: string[] }[] = [
  {
    id: "listening",
    title: "Listening",
    lead: "Luyện nghe theo từng dạng bài của IELTS. Giáo viên cùng bạn xem lại những chỗ nghe sai và tìm nguyên nhân.",
    points: ["Nghe và làm bài theo từng dạng", "Xem lại lỗi sai cùng giáo viên", "Bài tập nghe sau mỗi buổi"],
  },
  {
    id: "reading",
    title: "Reading",
    lead: "Luyện đọc hiểu, tìm thông tin và chia thời gian theo từng dạng câu hỏi.",
    points: ["Làm bài đọc theo dạng câu hỏi", "Giải thích vì sao đáp án đúng hoặc sai", "Luyện chia thời gian làm bài"],
  },
  {
    id: "writing",
    title: "Writing",
    lead: "Bạn viết, giáo viên sửa trực tiếp từng câu và giải thích lý do.",
    points: ["Sửa bài Task 1 và Task 2", "Giải thích lỗi ngữ pháp và cách diễn đạt", "Viết lại đoạn văn sau khi được sửa"],
  },
  {
    id: "speaking",
    title: "Speaking",
    lead: "Luyện nói 1-1 với giáo viên và nhận xét ngay sau mỗi phần.",
    points: ["Luyện theo ba phần của bài thi", "Nhận xét phát âm và độ trôi chảy", "Nói lại sau khi được góp ý"],
  },
];
