# 14 Thành phần nổi (`FloatingCta.tsx`)
- **Máy tính:** nút Zalo tròn góc phải dưới (48px), tooltip "Chat với Sophie". Sự kiện `zalo_click`.
- **Điện thoại:** thanh dính đáy 2 nút "Nhận lộ trình" (cam, chữ navy) + "Zalo"; **chỉ hiện khi hero đã khuất** (IntersectionObserver), ẩn khi đang ở `#dang-ky`. Chiều cao ≤ 64px + `env(safe-area-inset-bottom)`; không che quá 1/4 màn.
- **Motion:** trượt lên 0.3s; giảm chuyển động thì hiện thẳng.
- Không dùng widget chat bên thứ ba nặng; link Zalo thuần (`https://zalo.me/<số hoặc OA>`).
