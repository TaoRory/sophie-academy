# 08 Kết quả và câu chuyện (`Results.tsx`), id `ket-qua`
- **Câu hỏi khách:** bằng chứng đâu?
- **Dữ liệu:** `src/content/results.ts`: `{ name, audience, before, after, months, quote?, scoreImage, consent: true, featured? }`. **Chỉ render mục `consent: true`.** Ảnh bảng điểm đã che số báo danh, ngày sinh, ảnh chân dung (xử lý trước khi đưa vào `public/results/`).
- **Bố cục:** khác phần 07: nền `--brand-soft`, không phải navy. Trên: một câu chuyện lớn (tên, nhóm, band trước → sau cỡ rất lớn, số tháng, trích lời, ảnh bảng điểm). Dưới: lưới ảnh bảng điểm 3–4 cột, bấm để phóng (dialog có Esc, focus trả lại).
- **Motion:** `Rise` so le; band "trước → sau" không đếm số chạy.
- **Điện thoại:** câu chuyện xếp dọc; lưới thành trượt ngang có điểm bắt.
