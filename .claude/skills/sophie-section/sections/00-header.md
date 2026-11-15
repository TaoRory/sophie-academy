# 00 Header (`Header.tsx`)
- **Nội dung:** logo (`logo-on-light.svg`, SVG nội tuyến) · neo: Vì sao 1-1 (`#vi-sao-1-1`) · Lộ trình (`#lo-trinh`) · Giáo viên (`#giao-vien`) · Kết quả (`#ket-qua`) · Hỏi đáp (`#hoi-dap`) · nút chính **Nhận lộ trình riêng** → `#dang-ky`.
- **Bố cục:** dính trên cùng, nền trắng; sau 80px cuộn thì thu thấp và có viền dưới. `:root { --kit-header: 4rem }`.
- **Điện thoại:** logo + nút "Nhận lộ trình" + nút Menu (ngăn kéo toàn màn, khóa cuộn nền, focus trap, Esc đóng).
- **Motion:** `.kit-roll` cho chữ nút; link neo cuộn bằng `scrollToTarget()` của `@/lib/motion` (bù chiều cao header). Menu mở 0.4s `EASE.inOut`.
- **Xong khi:** neo tới đúng chỗ không bị header che; Tab qua menu thấy focus; mở menu thì trang sau không cuộn.
