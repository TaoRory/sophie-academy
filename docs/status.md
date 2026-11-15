# Trạng thái dự án Sophie IELTS

> File sống. Agent đọc đầu mỗi phiên, cập nhật sau mỗi đơn vị việc. Ngắn gọn: một dòng mỗi mục.

## Phase hiện tại: P0, P1, P2 xong (chờ dữ liệu thật của Sophie); kế tiếp P3 (Motion T0–T1)

| Phase | Trạng thái | Ghi chú |
|---|---|---|
| Chuẩn bị (.claude, skills, logo SVG) | Xong 15/11/2026 | |
| P0 Nền | **Xong 15/11/2026** | build sạch, lint/tsc sạch, site-qa 20/20 trên `/` và `/chinh-sach-bao-mat`; header, footer, FloatingCta, 404, chính sách (bản nháp) |
| P1 Nội dung tĩnh | **Xong 15/11/2026** | 12 phần + trang phụ dựng xong; Teachers/Results/Feedback/ResultStrip hiện khung chờ vì `src/content` trống |
| P2 Form + Sheet | **Code xong, chưa nối Sheet thật** | `/api/lead` → webhook; đã thử end-to-end với webhook giả (nhận đủ payload + UTM, chuyển `/cam-on`); thiếu env thì báo lỗi thật. Còn: viết Apps Script + `LEAD_WEBHOOK_URL/SECRET` |
| P3 Motion T0–T1 | Chưa | |
| P4 T2 + T3 | Chưa | |
| P5 Nội dung thật + QA | Chưa | |
| P6 Bàn giao | Chưa | |

## P3: việc kế tiếp
Motion T0–T1 theo bảng phân cảnh trong `docs/master-plan.md` mục 5: `SplitReveal` cho H1 hero, `Rise` cho các khối, `.kit-roll` đã có ở nút, `Magnetic` cho CTA hero, gạch chân/đường đuôi mèo `.kit-draw`, Tilt khung mô hình. Sau đó P4: cảnh ghim `lo-trinh` (`usePinProgress`), `VelocityMarquee` có nút dừng, Flip cho Estimator.
Đã có sẵn: `src/components/motion/*`, `MotionProvider`, `motion.css`. Chưa dùng recipe nào trong section (mọi phần đang tĩnh).

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
| 7 | Google Sheet nhận lead (hoặc nhận Apps Script để dán) | dang-ky (gửi thật) | Chờ. Agent viết Apps Script mẫu ở P5 |

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
- Đường đuôi mèo chữ S: logo gốc gộp mèo và chữ S thành một path (không tách được). `public/brand/mascot-mark.svg` là cả mèo + S; đường uốn dùng cho cảnh lộ trình (P4) sẽ vẽ riêng bằng stroke.
- Hero H1 dùng cỡ riêng (`4.25rem` tối đa) để nút CTA nằm trong màn đầu ở 1280×720 / 1366×768 / 375×667 (đã đo).
- Ô so sánh không nói xấu gia sư/lớp khác ("Tùy người", không "Thường không có").
- Chip ước lượng dùng thứ tự kỹ năng tham khảo (`estimatorRules.priorityFor`) do mình đặt: Sophie cần duyệt.
