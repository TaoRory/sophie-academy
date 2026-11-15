# 09 Học viên và phụ huynh nói gì (`Feedback.tsx`), id `feedback`
- **Dữ liệu:** `src/content/testimonials.ts`: `{ name, role: "Phụ huynh" | "Học sinh" | "Sinh viên" | "Người đi làm", quote, screenshot?, consent: true }`. Ảnh chụp tin nhắn đã che tên/số người khác.
- **Bố cục:** masonry 3 cột (CSS columns), xen ảnh chụp tin nhắn và trích dẫn chữ; trích dẫn chữ dùng nền trắng viền mảnh, ảnh có viền 16px.
- **Motion:** `Rise` (không giấu chữ), không marquee (đã dùng ở phần 02).
- **Điện thoại:** một hàng trượt ngang có điểm bắt, không xếp dọc hàng chục ô.
- **A11y:** ảnh tin nhắn có `alt` chép lại nội dung chính.
