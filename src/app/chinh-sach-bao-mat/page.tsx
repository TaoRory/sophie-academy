import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | Sophie IELTS",
  description: "Sophie IELTS thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn như thế nào.",
};

// TODO(sophie): bản nháp theo Nghị định 13/2023/NĐ-CP, cần Sophie (và tư vấn pháp lý nếu có) duyệt trước khi chạy quảng cáo.
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section wrap" style={{ maxWidth: 820 }}>
        <h1 style={{ fontSize: "clamp(2rem, 1rem + 3vw, 3rem)" }}>Chính sách bảo mật</h1>
        <div className="mt-8 flex flex-col gap-6 [&_h2]:mt-4 [&_h2]:text-2xl [&_ul]:list-disc [&_ul]:pl-6">
          <p>
            {site.legalName ?? site.name} (gọi là &ldquo;Sophie&rdquo;) tôn trọng thông tin cá nhân của bạn. Trang này nói rõ Sophie thu thập gì, dùng vào việc gì và bạn
            có những quyền nào.
          </p>
          <h2>Thông tin Sophie thu thập</h2>
          <p>Khi bạn điền biểu mẫu đăng ký: họ tên, số điện thoại/Zalo, nhóm của bạn (học sinh, sinh viên, người đi làm), band hiện tại, mục tiêu, hạn thi, khung giờ rảnh và ghi chú bạn tự nhập. Sophie cũng ghi lại trang bạn đến từ đâu (tham số UTM) để biết kênh nào hiệu quả.</p>
          <h2>Mục đích sử dụng</h2>
          <ul>
            <li>Liên hệ tư vấn, kiểm tra đầu vào và gửi lộ trình học cho bạn.</li>
            <li>Cải thiện nội dung và cách tiếp cận của Sophie.</li>
          </ul>
          <p>Sophie không bán hay chia sẻ thông tin của bạn cho bên thứ ba vì mục đích quảng cáo.</p>
          <h2>Nơi lưu và thời gian lưu</h2>
          <p>Thông tin được lưu trong bảng tính Google do Sophie quản lý, chỉ những người phụ trách tư vấn được truy cập. Sophie giữ thông tin trong thời gian cần thiết để tư vấn và chăm sóc học viên, hoặc đến khi bạn yêu cầu xóa.</p>
          <h2>Quyền của bạn</h2>
          <p>Bạn có quyền yêu cầu xem, sửa, xóa thông tin của mình và rút lại sự đồng ý bất cứ lúc nào bằng cách liên hệ Sophie qua {site.email ?? site.hotline ?? "kênh liên hệ trên trang"}.</p>
          <h2>Liên hệ</h2>
          <p data-todo={site.email || site.hotline ? undefined : "sophie"}>
            {site.email || site.hotline ? [site.email, site.hotline].filter(Boolean).join(" · ") : "Thông tin liên hệ đang cập nhật."}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
