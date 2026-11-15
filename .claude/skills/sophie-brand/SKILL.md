---
name: sophie-brand
description: Bộ nhận diện Sophie IELTS dạng chữ - mã màu và quy tắc tương phản, font, logo SVG, mascot, giọng văn, dữ kiện thật (nội quy, mô hình 1-1). Đọc khi viết CSS/token, đặt màu chữ/nút, chèn logo, viết nội dung hoặc cần biết Sophie có/không có gì.
---

# Sophie IELTS: brand

Mọi dữ kiện dưới đây đã được chép từ Drive của brand. **Không mở ảnh gốc** trong `assets/brand-source/`.

## Màu (CSS ở `src/styles/tokens.css`)
| Token | Hex | Dùng | Không dùng |
|---|---|---|---|
| `--ink` | `#232A60` | Chữ chính, tấm tối, footer, nút phụ | — |
| `--brand` | `#F28F20` | Nút chính, khối nhấn, nét đuôi mèo, chữ lớn trên navy (5.55:1) | Chữ trên trắng/xám (2.4:1) |
| `--paper` | `#EEEEEE` | Nền xen kẽ | — |
| `--white` | `#FFFFFF` | Nền chính, thẻ | Chữ trên cam |
| `--brand-ink` | `#A65400` | Chữ cam bắt buộc trên trắng (5.4:1) | Khối lớn |
| `--muted` | `#4A5070` | Chữ phụ (6.8:1 trên `#EEE`, 7.9:1 trên trắng, 6.75:1 trên `--brand-soft`) | — |
| `--brand-soft` | `#FDEBD6` (đề xuất) | Nền cam nhạt: cột Sophie trong bảng so sánh, câu chuyện kết quả (navy trên nền này 11.5:1) | — |

- Nút chính: nền `--brand`, chữ `--ink`. Nút phụ: nền `--ink`, chữ trắng; hoặc viền `--ink`.
- Focus ring: 2px `--ink` + offset 2px; trên tấm navy dùng `--brand`. `::selection` nền `--brand`, chữ `--ink`. `accent-color: var(--brand)`.
- Viền thẻ: `color-mix(in srgb, var(--ink) 20%, transparent)`.

## Chữ
- Tiêu đề: **Nunito** 800–900 (dáng bo tròn giống logo). Nội dung: **Be Vietnam Pro** 450–500. Tải bằng `next/font/google` với `subsets: ["latin", "vietnamese"]`.
- H1 `clamp(2.5rem, 1rem + 5.4vw, 5.25rem)`, H2 `clamp(1.875rem, 1rem + 2.6vw, 3.1rem)`; line-height tiêu đề 1.12–1.16 (dấu chồng); nội dung 1.0625–1.125rem / 1.55; chữ nhỏ ≥ 14px đậm 600.
- Không viết hoa toàn bộ tiêu đề dài.

## Hình khối
- Bo góc: tấm 28px (20px điện thoại), thẻ 16px, phần tử con 8px, nút bo tròn hẳn.
- Khoảng cách bội số 8; mỗi phần `clamp(72px, 10vw, 144px)`; khung 1240px; lề điện thoại 20–24px.
- Gần như không đổ bóng; tối đa 2 tấm navy mỗi trang (Giáo viên, Footer).

## Logo (đã chuẩn hóa, vector thật từ file .ai)
| File `assets/brand/` | Nền dùng |
|---|---|
| `logo-on-light.svg` | Trắng / `#EEE` (mèo + Sophie cam, IELTS navy) |
| `logo-on-navy.svg` | Navy (mèo + Sophie cam, IELTS `#EEE`) |
| `logo-on-orange.svg` | Cam (mèo + Sophie navy, IELTS `#EEE`) |
| `logo-mono.svg` | Bất kỳ, màu theo `currentColor` |
Chép sang `public/brand/` khi dựng; header dùng SVG nội tuyến để đổi màu khi cuộn nếu cần.

## Chữ ký thị giác: con mèo Sophie
Mèo cam tách lớp đi theo người xem: đậu trên các khối, nhảy sang phần mới, vẫy chào khi rê chuột/chạm (spec `sophie-section/sections/16-meo.md`). Đường uốn chữ S trong cảnh ghim Lộ trình là phần phụ.
**Không dùng khối màu tô sau chữ (`.kit-mark`)**: owner chê "trông AI" (15/11/2026). Nhấn từ khóa bằng màu chữ `--brand-ink`. Không thêm blob, gradient, kính mờ.

## Mascot
- `CatRig` (vẽ tay theo mèo vẫy tay trên ảnh bìa): con mèo đi theo trang. Thay bằng file của designer khi có.
- `Mascot` (mèo + chữ S tách từ logo, một path): dùng tĩnh ở `/cam-on`.
- Logo header nội tuyến (`LogoInline`, nhóm `[data-logo-cat]`) nhún khi rê chuột.

## Dữ kiện thật (được phép đưa lên trang)
- Mô hình: **1 giáo viên – 1 học viên**, online (Zoom/Meet). Học viên không tự ý học chung hay ghép buổi.
- "Experienced & Dedicated Teaching Team", giáo viên **IELTS 8.0**. Dạy đủ 4 kỹ năng. "Personal Learning Roadmap".
- Kiểm tra tổng hợp **mỗi tháng 1 bài**, kết quả dùng để theo dõi tiến độ và chỉnh nội dung tháng sau.
- Đổi lịch cố định: báo trước ít nhất 1 tuần. Đổi tạm thời: báo trước ít nhất 1 ngày. Báo qua nhóm lớp.
- Học phí đã đóng không hoàn lại; được **bảo lưu** theo quy định hoặc **chuyển nhượng** suất học cho người khác.
- Bài tập: bắt buộc hoàn thành; muốn thêm bài thì báo trong nhóm lớp.
- Slogan: **"Học nghiêm túc – Tiến bộ từng ngày – Chinh phục mục tiêu IELTS"**.
- Chưa xác nhận (không được đăng cho tới khi Sophie xác nhận): test đầu vào miễn phí, học thử, phản hồi trong 24h, học phí, số học viên.

## Giọng văn
- Như một người thầy kèm riêng nói chuyện: ấm, cụ thể, nghiêm túc. Xưng "Sophie", gọi "bạn"; khối dành cho phụ huynh gọi "con".
- Lời chào hàng: "IELTS 1 kèm 1 online: giáo viên 8.0 dạy riêng bạn, theo lộ trình được đo lại mỗi tháng."
- Lời mời duy nhất: **"Nhận lộ trình riêng"**; nút phụ: **"Chat Zalo"**.
- Tránh: "giải pháp toàn diện", "đột phá", "cam kết 100%", emoji thay icon, eyebrow trên mọi tiêu đề.
