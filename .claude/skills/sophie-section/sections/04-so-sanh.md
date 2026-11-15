# 04 Vì sao 1 kèm 1 (`Comparison.tsx`), id `vi-sao-1-1`
- **Câu hỏi khách:** khác gì lớp đông, gia sư tự do?
- **Nội dung:** bảng định tính 3 cột: Lớp đông · Gia sư tự do · **Sophie 1-1** (cột tô `--brand-soft`). Các hàng: thời gian được nói và sửa bài · lộ trình riêng · kiểm tra tiến độ mỗi tháng · đổi lịch linh hoạt (báo trước 1 tuần/1 ngày) · giáo viên band 8.0+ · nội quy và quy trình rõ ràng. Ô ghi chữ ngắn ("Có", "Tùy người", "Ít"), **không số liệu**. Dữ liệu: `src/content/comparison.ts`.
- **Bố cục:** `<table>` thật có `<caption>` ẩn bằng `sr-only`; cột Sophie bo góc, nổi nhẹ.
- **Motion (T1):** cột Sophie `Rise kind="pop"` trước, dấu tích vẽ nét `.kit-draw` so le 0.06s.
- **Điện thoại:** bảng trượt ngang có điểm bắt, cột đầu (tiêu chí) dính trái; thẻ cha `position: relative` để không tràn trang.
