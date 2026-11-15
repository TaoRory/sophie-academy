# 16 Mèo Sophie (`src/components/cat/`)
Chữ ký thị giác của trang (thay cho khối tô chữ đã bỏ theo góp ý owner 15/11/2026).

## File
- `CatRig.tsx`: chỉ là hình SVG vẽ tay theo mèo vẫy tay trên ảnh bìa. Nhóm `data-part`: `tail` (khớp 134 198), `arm` (80 146), `head` (100 128), `eyes` (100 92), `body`, `shadow`, `bubble` ("Hello!", mặc định `opacity=0`). Có file thiết kế của Sophie thì thay hình, giữ tên `data-part` và khớp.
- `CatCompanion.tsx`: logic, mount một lần trong `src/app/page.tsx`. Vòng lặp trên `gsap.ticker` (đăng ký sau Lenis bằng rAF).
- CSS: `tokens.css` mục "Mèo Sophie".

## Hành vi
- **Máy tính** (`MQ.desktopMotion`): đậu trên mép trên khối có `data-cat-perch="left|right"` (cách góc 24px). Chỗ đậu hoạt động = mép trên nằm trong `[64 + 0.6·catH, 85% vh]`, gần 40% vh nhất. Đổi chỗ đậu → nhảy vòng cung 0.62s (nhún, duỗi, quay mặt theo hướng nhảy, tiếp đất nén), đỉnh vòng cung không chui dưới header.
- **Điện thoại** (`MQ.mobileMotion`): 72px; đậu ở hero, qua hero thì ngồi trên thanh CTA đáy (`data-cat-perch-mobile`), nhảy tại chỗ khi phần ở giữa màn đổi.
- **Vẫy chào**: rê chuột (chuột thật) hoặc chạm: tay xoay tới 118° rồi vẫy, đuôi vẫy, đầu nghiêng, bong bóng "Hello!" ~1.6s.
- Không vòng lặp vô hạn: sau tiếp đất / vẫy, đuôi đung đưa vài nhịp và chớp mắt rồi đứng yên.
- **Giảm chuyển động / không JS**: không có companion; `.hero-cat-static` (render sẵn trong Hero) hiện. Companion chạy thì đặt `html[data-cat="on"]` để ẩn mèo tĩnh.

## Chỗ đậu hiện có (xen kẽ trái/phải)
hero khung mô hình (phải) · noi-dau tabpanel (trái) · vi-sao-1-1 bảng (phải) · lo-trinh wrapper quanh `.roadmap-visual` (phải) · uoc-luong (trái) · giao-vien tấm navy (phải) · ket-qua (trái) · feedback (phải) · hoc-online `#ho-panel` (phải) · hoi-dap cột trái (trái) · dang-ky ô Zalo (phải).
Thêm chỗ đậu: gắn `data-cat-perch` vào khối **ổn định** (không đặt lên phần tử có `key` đổi theo state, vì phần tử bị thay mới).
