# 01 Hero (`Hero.tsx`), id `hero`
**Câu hỏi khách:** đây là gì, có hợp với mình không?

## Nội dung (`src/content/site.ts` → `hero`)
- H1: "IELTS 1 kèm 1 online. Giáo viên 8.0 dạy riêng bạn." Cụm "dạy riêng bạn" màu `--brand-ink`, **không** khối tô (owner bỏ).
- Phụ đề hai sắc độ (nửa navy, nửa `--muted`, cùng cỡ): "Lộ trình riêng, kiểm tra mỗi tháng để chỉnh lại. Học ở đâu cũng được."
- CTA: **Nhận lộ trình riêng** (→ `#dang-ky`, bọc `Magnetic`) · **Chat Zalo** (link Zalo từ `site.ts`).
- 4 chip kỹ năng: Listening · Reading · Writing · Speaking (icon SVG nét, không emoji).

## Mô hình buổi học (bên phải, HTML/CSS, ghi nhỏ "Minh họa")
Khung kiểu cuộc gọi video: ô giáo viên (ảnh thật từ `teachers[0]`, tên, "IELTS 8.0") + ô học viên (avatar trừu tượng). Bên cạnh là thẻ "Writing Task 2": một câu sai, từ sai bị gạch, từ đúng hiện ra màu `--brand-ink`, kèm ghi chú ngắn của giáo viên. Mascot mèo ngồi ở mép khung, đuôi nối thành đường `tail.svg` chạy về phía CTA.

## Bố cục
Lưới 2 cột (7/5), chữ căn trái. Chiều cao `min-height: 100svh` trừ header; không dùng `vh`. Ảnh/khung có kích thước cố định (CLS 0).

## Motion (T1 + T0), timeline ≤ 1.5s
1. `SplitReveal as="h1" trigger="load"` (H1 không bắt đầu từ opacity 0 ngoài mặt nạ dòng của recipe).
3. Khung video `yPercent: 8 → 0`, rồi câu sửa bài: gạch từ sai, hiện từ đúng (0.6s).
Mèo: `.hero-cat-static` trên khung (cho không JS / giảm chuyển động); khi có chuyển động thì `CatCompanion` thay thế (xem `16-meo.md`). Khung mô hình bọc `<div data-cat-perch="right">`.
`Tilt` nhẹ cho khung mô hình (chỉ `MQ.fineHover`).

## Điện thoại
Một cột: chữ → CTA → mô hình thu gọn (chỉ thẻ sửa bài). Bỏ Tilt, Magnetic. Mascot nhỏ lại hoặc ẩn nếu chiếm quá chỗ.

## Xong khi
H1 + nút chính thấy ngay không cần cuộn ở 375×667 và 1280×720; tắt JS vẫn đủ chữ; LCP là H1 (không phải ảnh).
