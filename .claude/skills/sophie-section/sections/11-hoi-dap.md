# 11 Hỏi đáp (`Faq.tsx`), id `hoi-dap`
- **Dữ liệu:** `src/content/faq.ts` (8–10 câu). Gợi ý: Học phí bao nhiêu? (→ "tùy lộ trình, Sophie báo sau kiểm tra đầu vào", **không ghi số**) · Giáo viên có cố định không? · Nghỉ thì học bù thế nào? · Có hoàn học phí không? (trả lời đúng nội quy: không hoàn, được bảo lưu/chuyển nhượng) · Cần thiết bị gì? · Có học thử không? (chỉ khi Sophie xác nhận) · Phụ huynh theo dõi tiến độ thế nào? · Mất gốc có học được không?
- **Bố cục:** hai cột: trái tiêu đề dính + nút "Hỏi trực tiếp qua Zalo"; phải các hàng `<details>` (mở được khi tắt JS).
- **Motion:** mở/đóng 0.3s `power3.inOut` cho chiều cao qua `grid-template-rows` hoặc `interpolate-size`; giảm chuyển động thì cắt thẳng.
- **SEO:** JSON-LD `FAQPage` sinh từ cùng `faq.ts`.
