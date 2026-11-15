# Trạng thái dự án Sophie IELTS

> File sống. Agent đọc đầu mỗi phiên, cập nhật sau mỗi đơn vị việc. Ngắn gọn: một dòng mỗi mục.

## Phase hiện tại: P0 xong, kế tiếp P1 (Nội dung tĩnh)

| Phase | Trạng thái | Ghi chú |
|---|---|---|
| Chuẩn bị (.claude, skills, logo SVG) | Xong 15/11/2026 | |
| P0 Nền | **Xong 15/11/2026** | build sạch, lint/tsc sạch, site-qa 20/20 trên `/` và `/chinh-sach-bao-mat`; header, footer, FloatingCta, 404, chính sách (bản nháp) |
| P1 Nội dung tĩnh | Chưa | |
| P2 Form + Sheet | Chưa | |
| P3 Motion T0–T1 | Chưa | |
| P4 T2 + T3 | Chưa | |
| P5 Nội dung thật + QA | Chưa | |
| P6 Bàn giao | Chưa | |

## P1: việc kế tiếp
Dựng 13 phần theo skill `sophie-section`, **chưa có hiệu ứng**, dữ liệu trong `src/content/*.ts` (thêm `types.ts`). Hero hiện là khung tạm trong `src/app/page.tsx`. Thiếu dữ liệu thật thì khung chờ `data-todo="sophie"`.
Thứ tự đề xuất: hero → so-sanh → noi-dau → lo-trinh (bản tĩnh) → hoi-dap → giao-vien → ket-qua → feedback → hoc-online → ket-qua-strip → uoc-luong → dang-ky.

## Đang chờ Sophie
| # | Thứ cần | Chặn phần | Trạng thái |
|---|---|---|---|
| 1 | Logo SVG | header, footer | **Xong**: tự xuất từ `FILE GỐC.ai` → `assets/brand/` |
| 1b | Vector mascot mèo vẫy tay (không có trong file .ai) | hero, cam-on, 404 | Chờ |
| 2 | Hồ sơ giáo viên (ảnh, tên, band, thế mạnh, kinh nghiệm, câu nói, ai nổi bật) | hero, giao-vien | Chờ |
| 3 | Bảng điểm + feedback có đồng ý đăng (band trước → sau, số tháng) | ket-qua-strip, ket-qua, feedback | Chờ |
| 4 | Bảng quy tắc ước lượng (tháng / 0.5 band theo số buổi/tuần) | uoc-luong (số tháng) | Chờ |
| 5 | Xác nhận: test đầu vào miễn phí? học thử? phản hồi 24h? | lo-trinh, hoi-dap, dang-ky | Chờ |
| 6 | Zalo/OA, hotline, Facebook/TikTok, email, tên pháp nhân | header, dang-ky, footer, chính sách | Chờ |
| 7 | Google Sheet nhận lead (hoặc nhận Apps Script để dán) | dang-ky | Chờ |

## Quyết định đã chốt
- Landing một trang + `/cam-on`, `/chinh-sach-bao-mat`, 404. Học online 1-1. Không công khai học phí. Lead → Google Sheet (Apps Script) + Zalo. Đối tượng: học sinh THCS/THPT, sinh viên, người đi làm.
- Màu lấy theo bảng màu brand (`#232A60`, `#F28F20`, `#EEEEEE`); file .ai gốc có mã hơi khác (`#162661`, `#F38E0A`) do chuyển CMYK, đã chuẩn hóa về bảng màu trong SVG.
- Chữ ký thị giác: đường đuôi mèo chữ S. Không WebGL.

## Nhật ký lỗi / bài học
- `.container` của mình bị Tailwind 4 ghi đè (utility cùng tên): dùng `.wrap`. Class component viết trong `@layer components`, nếu không sẽ thắng utility (`lg:hidden` mất tác dụng trên `.btn`).
- Next 16: `new Date()` trong Server Component làm build lỗi (prerender). Dùng hằng số (`site.year`).
- `pkill -f` / `pgrep -f` trong Bash tool tự khớp lệnh của chính nó (exit 144): dùng `fuser -k 3000/tcp` để dừng server.
- Playwright mới cần `npx playwright install chromium` (đã chạy một lần).
- `public/favicon.ico` còn là icon mặc định của Next: thay bằng icon mèo khi có mascot/vector (TODO).
- `/chinh-sach-bao-mat` là bản nháp, cần Sophie duyệt trước khi chạy quảng cáo.
