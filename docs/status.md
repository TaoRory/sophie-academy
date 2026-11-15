# Trạng thái dự án Sophie IELTS

> File sống. Agent đọc đầu mỗi phiên, cập nhật sau mỗi đơn vị việc. Ngắn gọn: một dòng mỗi mục.

## Phase hiện tại: P0–P4 xong (chờ dữ liệu thật của Sophie); kế tiếp P5 (nội dung thật + SEO + Apps Script + QA)

| Phase | Trạng thái | Ghi chú |
|---|---|---|
| Chuẩn bị (.claude, skills, logo SVG) | Xong 15/11/2026 | |
| P0 Nền | **Xong 15/11/2026** | build sạch, lint/tsc sạch, site-qa 20/20 trên `/` và `/chinh-sach-bao-mat`; header, footer, FloatingCta, 404, chính sách (bản nháp) |
| P1 Nội dung tĩnh | **Xong 15/11/2026** | 12 phần + trang phụ dựng xong; Teachers/Results/Feedback/ResultStrip hiện khung chờ vì `src/content` trống |
| P2 Form + Sheet | **Code xong, chưa nối Sheet thật** | `/api/lead` → webhook; đã thử end-to-end với webhook giả (nhận đủ payload + UTM, chuyển `/cam-on`); thiếu env thì báo lỗi thật. Còn: viết Apps Script + `LEAD_WEBHOOK_URL/SECRET` |
| P3 Motion T0–T1 | **Xong 15/11/2026** | SplitReveal H1, Magnetic CTA hero, Tilt khung mô hình, Rise (pop/wipe/up) ở so sánh, ước lượng, giáo viên, kết quả, feedback, form; mèo hero pop; `.kit-mark` tự quét |
| P4 T2 + T3 | **Xong 15/11/2026** | Cảnh ghim `lo-trinh` (đường S vẽ dần, 5 mốc, hình đổi theo mốc; điện thoại/giảm chuyển động/không JS dùng bản tĩnh); Estimator dùng GSAP Flip; băng kết quả có nút dừng (chưa test vì chưa có dữ liệu) |
| P5 Nội dung thật + QA | Chưa | |
| P6 Bàn giao | Chưa | |

## P5: việc kế tiếp
1. Apps Script mẫu nhận lead + hướng dẫn dán (`docs/lead-apps-script.md`), đặt `LEAD_WEBHOOK_URL/SECRET` trên Vercel.
2. SEO: JSON-LD `EducationalOrganization` + `Course` (FAQPage đã có), `sitemap.ts`, `robots.ts`, ảnh OG dựng từ ảnh bìa, `favicon` mèo.
3. Thay khung chờ bằng dữ liệu thật khi Sophie gửi (`src/content/{teachers,results,testimonials,estimatorRules,site}.ts`), thêm Drawer chi tiết giáo viên và dialog phóng ảnh bảng điểm.
4. Đo lường GA4/Meta Pixel (`lead_submit`, `zalo_click`, `estimator_use`) khi có ID.
5. QA cuối: Lighthouse mobile, thử điện thoại thật, đổi kích thước giữa cảnh ghim, thử băng kết quả khi đã có ≥ 6 kết quả.

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
- Cảnh ghim: mỗi mốc cao cố định 84px (đường S và chấm mốc căn theo `ROW` trong `RoadmapScene.tsx`); nếu đổi cỡ chữ mô tả phải kiểm lại không tràn hàng. Bản tĩnh và cảnh dùng chung nội dung `roadmapSteps`, CSS `.kit-pin[data-live]` quyết định cái nào hiện.
- Chưa làm: mèo nháy mắt (mascot là ảnh SVG, không animate được phần mắt), gạch chân cong dưới từ khóa (đã có `.kit-mark` quét khối màu thay thế, đúng "chữ ký" của playbook), `Parallax`/`StackCards`/`HorizontalScroll` (không nằm trong ngân sách 2 cảnh T2).
- site-qa có 3 khung > 50ms khi cuộn qua cảnh ghim (p95 vẫn 16.7ms); theo dõi lại trên máy thật ở P5.
