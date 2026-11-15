# 16 Mèo Sophie gốc (`src/components/cat/`)
Chữ ký thị giác của trang. Owner yêu cầu (15/11/2026): **giữ đúng con mèo gốc của logo**, chuyển động **như mèo thật** (đi từ từ, nhảy xuống), không kiểu hoạt hình.

## File
- `logoCatPaths.ts`: sinh tự động từ `assets/brand/logo-on-light.svg` (path mèo + S và mắt). Không sửa tay.
- `CatRig.tsx`: một SVG, toạ độ theo viewBox logo, hai tư thế:
  - `sit`: đúng silhouette mèo ngồi của logo (quay người trái, ngoái đầu nhìn lên phải), chữ S cắt bằng clipPath, thay bằng `sit-tail`. `sit-paw` vẽ chồng khít lên chân trước để giơ lên vẫy.
  - `walk`: đầu gốc của logo (clipPath phần trên cổ) + thân, 4 chân (`leg-nf/ff/nb/fb`, chân xa màu đậm hơn), `walk-tail`, nhìn nghiêng sang phải. Khớp xoay ở `JOINT`.
  - Mặc định `walk` opacity 0 → không JS vẫn là mèo gốc ngồi.
- `CatCompanion.tsx`: logic, mount một lần ở `src/app/page.tsx`. Ghi `data-phase` lên `.cat-companion` để test.

## Chuỗi trạng thái (như mèo thật)
`sit` → đứng dậy → `walk` (bước chéo chân, thân nhấp nhô, đuôi đung đưa; 115px/s máy tính, 80px/s điện thoại; mỗi lần đi ≤ ~300px / 2.6s) → `edge` (dừng, cúi nhìn xuống hoặc ngước lên, nhún) → `jump` (chân trước vươn, chân sau đạp; rơi có gia tốc t², nhảy lên thì chậm dần) → `land` (chân trước chạm trước, thân nén) → đi tới chỗ ngồi → `sit` (đuôi vẫy vài nhịp rồi yên).
- Nhảy **xuống** khối thấp hơn: đi ra **mép gần nhất** rồi mới nhảy. Nhảy **lên**: nhún, ngước nhìn, bật tại chỗ.
- Khối đang đứng trôi khỏi tầm nhìn (khi cuộn nhanh): bỏ đoạn đi, nhảy ngay từ mép khung nhìn.
- Không có mép khối nào trong vùng đẹp quá 0.45s: xuống **sàn ảo** đáy màn hình (`[data-cat-floor]`, bên trái để tránh nút Zalo) ngồi chờ; xuống sàn thì ngồi ngay chỗ tiếp đất.
- Hướng mặt: `walk` scaleX = f; `sit` scaleX = -f (mèo gốc vốn quay trái).
- **Vẫy chào** (chỉ khi đang ngồi): rê chuột (chuột thật) / chạm → `sit-paw` giơ lên vẫy, đuôi vẫy, bong bóng "Hello!".
- **Điện thoại**: 80px; đậu hero → xuống thanh CTA đáy (`data-cat-perch-mobile`); sang phần mới thì thong thả đi sang đầu kia thanh.
- **Giảm chuyển động / không JS**: không companion; `.hero-cat-static` (mèo gốc ngồi) trong Hero.

## Chỗ đậu (`data-cat-perch="left|right"`, xen kẽ)
hero khung mô hình (phải) · noi-dau tabpanel (phải) · vi-sao-1-1 bảng (trái, tránh đầu cột cam) · lo-trinh wrapper `.roadmap-visual` (phải) · uoc-luong (trái) · giao-vien (phải) · ket-qua (trái) · feedback (phải) · hoc-online (phải) · hoi-dap (trái) · dang-ky ô Zalo (phải).
Gắn chỗ đậu vào khối **ổn định** (không lên phần tử có `key` đổi theo state). Tránh khối có mép trên màu cam (mèo cam bị chìm).
