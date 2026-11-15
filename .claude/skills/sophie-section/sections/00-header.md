# 00 Header + menu nhiều trang (owner yêu cầu 15/11/2026: "không chỉ cuộn", menu kiểu DOL)
Dữ liệu menu: `src/content/menu.ts` (nguồn duy nhất; Header, Footer, breadcrumb đều đọc từ đây). Header render trong `SiteShell` (root layout) nên mọi trang đều có.

## Cấu trúc menu
| Mục | Loại | Trang |
|---|---|---|
| Về Sophie | xổ xuống 2 cột | `/ve-sophie`, `/doi-ngu-giao-vien`, `/noi-quy`, `/hoi-dap` |
| Chương trình | xổ xuống 2 cột | `/chuong-trinh` (+ `/hoc-sinh`, `/sinh-vien`, `/nguoi-di-lam`), `/chuong-trinh/4-ky-nang#listening…` |
| Điểm & Review | link | `/diem-va-review` |
| Công cụ miễn phí | xổ xuống | `/cong-cu/tim-loi-sai`, `/cong-cu/uoc-luong-lo-trinh` |
| (nút cam) Nhận lộ trình riêng | `CtaLink` | `/dang-ky` (trang có form `#dang-ky` thì cuộn tại chỗ) |
Thêm mục / trang: sửa `menu.ts`, tạo `src/app/<đường-dẫn>/page.tsx` dùng `PageHero` + các section có sẵn + `FinalCta`.

## Hành vi (Header.tsx)
- Xổ xuống: rê chuột thật mở (trễ đóng 160ms), bấm/Enter mở-đóng, Esc đóng và trả focus, bấm ngoài đóng, đổi trang đóng. Bảng xổ có cột liên kết + thẻ navy CTA kèm mèo `Mascot`.
- Gạch chân cam `.menu-item::after` cho mục đang mở / đang ở trang (usePathname).
- Logo nội tuyến: mèo nhún khi rê. Thanh tiến độ cuộn `.header-progress`. Ẩn khi cuộn xuống, hiện khi cuộn lên (không ẩn: `scrollY < 400`, giảm chuyển động, menu mở, focus trong header, bấm link).
- Điện thoại: nút Menu → ngăn kéo navy, nhóm accordion; khóa cuộn nền, Esc, focus trap.
- Lenis ghi đè `window.scrollTo`: test hướng cuộn bằng `mouse.wheel`.
