# 03 "Bạn có thấy quen không?" (`PainPoints.tsx`), id `noi-dau`
- **Câu hỏi khách:** họ có hiểu vấn đề của mình không?
- **Nội dung:** một câu lớn hai sắc độ, ví dụ "Học IELTS không khó vì bạn lười. <span muted>Khó vì không ai sửa đúng chỗ bạn sai.</span>"
- **Tab:** Học sinh · Sinh viên · Người đi làm (`src/content/painPoints.ts`, 4–5 dòng mỗi tab). Ví dụ: học sinh "Lớp 25 bạn, con ít khi được sửa bài"; đi làm "Chỉ rảnh sau 21h, lớp toàn giờ cố định". Mỗi dòng kết bằng nửa câu "Sophie làm thế này: …" màu `--muted`.
- **Trạng thái dùng chung:** tab đang chọn lưu ở context `AudienceContext` (client), phần 06 đọc lại để chọn sẵn "Bạn là".
- **Bố cục:** hàng kẻ dòng mảnh, không thẻ, không icon. Tab là nút viên; khối nhấn dưới tab trượt bằng GSAP Flip.
- **Motion:** đổi tab 300ms `power2.out`; nội dung mới trồi 16px (không fade chữ).
- **Điện thoại:** tab thành nút xếp chồng hoặc cuộn ngang có điểm bắt.
- **A11y:** `role="tablist"`, phím mũi tên chuyển tab.
