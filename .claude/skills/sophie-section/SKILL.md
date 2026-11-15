---
name: sophie-section
description: Spec dựng từng phần của landing Sophie IELTS (header, hero, dải kết quả, nỗi đau, so sánh, lộ trình ghim, ước lượng, giáo viên, kết quả, feedback, học online, hỏi đáp, lời mời/form, footer, nút nổi, trang phụ) - nội dung, bố cục, animation, điện thoại, file dữ liệu. Đọc khi tạo hoặc sửa một section/trang của site.
---

# Sophie IELTS: dựng từng phần

**Cách dùng:** tìm phần cần làm trong bảng, đọc **đúng một** file spec ở `sections/`. Không đọc các spec khác trừ khi spec đang đọc trỏ tới. Màu/font/giọng văn: skill `sophie-brand`.

| id (anchor + tên file `src/sections/`) | Spec | Tầng motion | Bố cục |
|---|---|---|---|
| `header` → `Header.tsx` | `sections/00-header.md` | T0 | Header dính |
| `hero` → `Hero.tsx` | `sections/01-hero.md` | T1 + T0 | Chữ trái, mô hình buổi học phải |
| `ket-qua-strip` → `ResultStrip.tsx` | `sections/02-ket-qua-strip.md` | **T2 #1** | Băng chạy |
| `noi-dau` → `PainPoints.tsx` | `sections/03-noi-dau.md` | T0 UI | Tab + hàng kẻ |
| `vi-sao-1-1` → `Comparison.tsx` | `sections/04-so-sanh.md` | T1 | Bảng 3 cột |
| `lo-trinh` → `Roadmap.tsx` | `sections/05-lo-trinh.md` | **T2 #2 (chữ ký)** | Ghim, list trái điều khiển hình phải |
| `uoc-luong` → `Estimator.tsx` | `sections/06-uoc-luong.md` | **T3** | Khối chip + kết quả |
| `giao-vien` → `Teachers.tsx` | `sections/07-giao-vien.md` | T1 + T0 | Tấm navy, 1 nổi bật + hàng |
| `ket-qua` → `Results.tsx` | `sections/08-ket-qua.md` | T1 | Câu chuyện lớn + lưới bảng điểm |
| `feedback` → `Feedback.tsx` | `sections/09-feedback.md` | T1 | Masonry |
| `hoc-online` → `HowOnline.tsx` | `sections/10-hoc-online.md` | T0 UI | List bấm đổi hình |
| `hoi-dap` → `Faq.tsx` | `sections/11-hoi-dap.md` | T0 UI | Hai cột accordion |
| `dang-ky` → `FinalCta.tsx` | `sections/12-dang-ky.md` | T0 | Hai ô lớn: form + Zalo |
| `footer` → `Footer.tsx` | `sections/13-footer.md` | — | Tấm navy |
| nổi → `FloatingCta.tsx` | `sections/14-noi.md` | T0 | Zalo + thanh đáy mobile |
| `/cam-on`, `/chinh-sach-bao-mat`, 404 | `sections/15-trang-phu.md` | T0 | — |
| mèo đi theo trang → `components/cat/` | `sections/16-meo.md` | T4 (chữ ký) | Lớp fixed, đậu trên `data-cat-perch` |

Thứ tự trên trang: đúng thứ tự bảng. Hai phần liền nhau không dùng chung khuôn.

## Quy ước chung mọi phần
- `<section id="{id}" data-section="{id}">`, đúng một `<h2>` (riêng hero là `<h1>`). `scripts/shot.mjs` chụp theo `data-section`.
- Server Component mặc định; phần có animation tách một client component nhỏ, nội dung đi qua props/children.
- Chữ và dữ liệu lấy từ `src/content/*.ts` (kiểu khai báo trong `src/content/types.ts`); component không chứa chuỗi tiếng Việt cứng trừ nhãn UI.
- Thiếu dữ liệu thật: render khung chờ có `data-todo="sophie"` + chữ "Đang cập nhật", không chèn dữ liệu giả trông như thật.
- Recipe motion chép ở `src/components/motion/`: `SplitReveal`, `Rise`, `Magnetic`, `Tilt`, `VelocityMarquee`, `usePinProgress`; CSS `.kit-mark`, `.kit-roll`, `.kit-draw`, `.kit-pin` trong `src/styles/motion.css`. Token `MQ`, `EASE`, `DUR` trong `src/lib/motion.ts`.
- Cần chi tiết API của recipe: đọc đầu file recipe trong `src/components/motion/` (đã có chú thích), không mở lại kit.
