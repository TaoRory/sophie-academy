---
name: sophie-section
description: Spec dựng từng phần của landing Sophie IELTS theo bố cục kiểu DOL English (hero, bảng vàng, giá trị, hành trình, giáo viên, cảm nhận, học online, ước lượng, hỏi đáp, đăng ký, footer, tab nổi, trang phụ). Đọc khi tạo hoặc sửa một section/trang của site.
---

# Sophie IELTS: dựng từng phần

**Cách dùng:** bố cục hiện tại theo DOL English: đọc `sections/dol-layout.md` (bảng mọi phần + ngôn ngữ chung). Spec riêng còn dùng: `sections/00-header.md` (header), `sections/06-uoc-luong.md` (công cụ ước lượng), `sections/15-trang-phu.md` (`/cam-on`, chính sách, 404). Màu/font/giọng văn: skill `sophie-brand`.

## Quy ước chung mọi phần
- `<section id="{id}" data-section="{id}">`, đúng một `<h2>` (riêng hero là `<h1>`). `scripts/shot.mjs` chụp theo `data-section`.
- Server Component mặc định; phần có animation tách một client component nhỏ, nội dung đi qua props/children.
- Chữ và dữ liệu lấy từ `src/content/*.ts` (kiểu khai báo trong `src/content/types.ts`); component không chứa chuỗi tiếng Việt cứng trừ nhãn UI.
- Thiếu dữ liệu thật: render khung chờ có `data-todo="sophie"` + chữ "Đang cập nhật", không chèn dữ liệu giả trông như thật.
- Recipe motion trong `src/components/motion/` (`SplitReveal`, `Rise`, `Magnetic`, …), token `MQ`/`EASE`/`DUR` trong `src/lib/motion.ts`. Bố cục DOL chỉ dùng chuyển động nhẹ.
- Cần chi tiết API của recipe: đọc đầu file recipe trong `src/components/motion/` (đã có chú thích), không mở lại kit.
