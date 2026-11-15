# 00 Header (`Header.tsx`)
- **Nội dung:** logo (`logo-on-light.svg`, SVG nội tuyến) · neo: Vì sao 1-1 (`#vi-sao-1-1`) · Lộ trình (`#lo-trinh`) · Giáo viên (`#giao-vien`) · Kết quả (`#ket-qua`) · Hỏi đáp (`#hoi-dap`) · nút chính **Nhận lộ trình riêng** → `#dang-ky`.
- **Bố cục:** dính trên cùng, nền trắng; sau 80px cuộn thì thu thấp và có viền dưới. `:root { --kit-header: 4rem }`.
- **Điện thoại:** logo + nút "Nhận lộ trình" + nút Menu (ngăn kéo toàn màn, khóa cuộn nền, focus trap, Esc đóng).
- **Motion:** `.kit-roll` cho chữ nút; link neo cuộn bằng `scrollToTarget()` của `@/lib/motion` (bù chiều cao header). Menu mở 0.4s `EASE.inOut`.
- **Xong khi:** neo tới đúng chỗ không bị header che; Tab qua menu thấy focus; mở menu thì trang sau không cuộn.

## Sinh động (15/11/2026, theo góp ý owner)
- Logo nội tuyến `LogoInline` (sinh từ `assets/brand/logo-on-light.svg` vào `src/components/ui/logoMarkup.ts`, không sửa tay); rê chuột thì `[data-logo-cat]` nhún (CSS `logo-cat-hop`). Thu gọn = `scale(.86)`, header luôn cao 4rem.
- Viên chỉ mục `.nav-pill`: `clip-path: inset(...)` ghi qua ref, CSS transition 0.35s; theo mục đang xem (IntersectionObserver, rootMargin -45%/-50%) hoặc mục đang rê.
- Thanh tiến độ `.header-progress`: `scaleX` từ `ScrollTrigger` (start 0, end max).
- Ẩn khi cuộn xuống (`data-hidden` → `translateY(-100%)`), hiện khi cuộn lên. Không ẩn khi: `scrollY < 400`, giảm chuyển động, focus trong header, menu mở, đang ở cảnh ghim `#lo-trinh[data-live]`. Bấm link neo thì không ẩn trong 1.5s.
- Lưu ý test: Lenis ghi đè `window.scrollTo`, muốn test hướng cuộn phải dùng `mouse.wheel`.
