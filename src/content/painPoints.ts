import type { Audience } from "./types";

export const painIntro = {
  strong: "Học IELTS không khó vì bạn lười.",
  muted: "Khó vì không ai sửa đúng chỗ bạn sai.",
};

export const painPoints: Record<Audience, { pain: string; answer: string }[]> = {
  "hoc-sinh": [
    { pain: "Lớp đông, con ít khi được sửa bài của riêng mình.", answer: "Sophie: giáo viên chỉ dạy một mình con trong cả buổi." },
    { pain: "Học xong không biết con đang yếu kỹ năng nào.", answer: "Sophie: kiểm tra tổng hợp mỗi tháng, lộ trình chỉnh theo kết quả." },
    { pain: "Lịch học ở trường và lớp thêm dày, khó theo lịch cố định của trung tâm.", answer: "Sophie: đổi lịch được, báo trước 1 ngày với lịch tạm thời." },
    { pain: "Phụ huynh không rõ con tiến bộ tới đâu.", answer: "Sophie: mỗi tháng có một bài kiểm tra để nhìn lại rõ ràng." },
  ],
  "sinh-vien": [
    { pain: "Cần IELTS để xét tốt nghiệp, học bổng hoặc du học nhưng không biết bắt đầu từ đâu.", answer: "Sophie: kiểm tra đầu vào rồi nhận lộ trình theo mục tiêu và hạn thi." },
    { pain: "Tự học qua video, Writing và Speaking không ai chấm.", answer: "Sophie: giáo viên sửa trực tiếp bài Writing và luyện Speaking 1-1." },
    { pain: "Lịch học đại học thay đổi theo kỳ.", answer: "Sophie: lịch học thỏa thuận riêng, đổi lịch cố định báo trước 1 tuần." },
    { pain: "Học mãi vẫn kẹt ở một mức điểm.", answer: "Sophie: bài kiểm tra mỗi tháng chỉ ra kỹ năng đang giữ điểm của bạn lại." },
  ],
  "di-lam": [
    { pain: "Chỉ rảnh buổi tối hoặc cuối tuần, lớp cố định không khớp.", answer: "Sophie: học 1-1 online, bạn và giáo viên chọn khung giờ." },
    { pain: "Đi làm về mệt, không có thời gian tự mày mò tài liệu.", answer: "Sophie: lộ trình và bài tập được giao sẵn, bạn chỉ cần làm theo." },
    { pain: "Thỉnh thoảng bận việc đột xuất, bỏ buổi là mất.", answer: "Sophie: báo trước 1 ngày để đổi lịch tạm thời; có bảo lưu theo quy định." },
    { pain: "Cần IELTS để định cư, du học thạc sĩ hay thăng tiến, không có thời gian đi lòng vòng.", answer: "Sophie: lộ trình đi thẳng vào mục tiêu và hạn thi của bạn." },
  ],
};
