---
name: sophie-qa
description: Kiểm tra landing Sophie IELTS với chi phí token thấp - chụp riêng một phần (scripts/shot.mjs), QA đầy đủ cuối phase (scripts/site-qa.mjs, Chromium GPU), kiểm form lead, Lighthouse. Đọc khi cần xem kết quả sau khi sửa giao diện, trước khi báo xong một phase, hoặc khi nghi lỗi hiển thị/animation.
---

# Sophie IELTS: QA

## Ba mức, dùng mức nhỏ nhất đủ trả lời câu hỏi
| Mức | Khi nào | Lệnh |
|---|---|---|
| 1. Type + lint | Sau mỗi lần sửa mã | `npx tsc --noEmit` và `npm run lint` |
| 2. Chụp một phần | Sau khi sửa giao diện một phần | `npm run dev` (nền) rồi `node scripts/shot.mjs <id> [375] [1280]`, rồi Read **một** ảnh trong `qa-output/shots/` |
| 3. QA đầy đủ | Cuối mỗi phase, trước khi báo xong | `npm run build && npm start` (nền) rồi `node scripts/site-qa.mjs http://localhost:3000 / cam-on chinh-sach-bao-mat` |

- Mức 2: mặc định một khổ (1280). Chỉ thêm 375 khi sửa bố cục điện thoại. `--reduced` khi sửa animation. Không dùng `--full` trừ khi cần xem nhịp cả trang.
- Đọc ảnh tốn token: chỉ Read ảnh của phần vừa sửa; không chụp lại phần không đổi.
- Mức 3 in ra `x/y kiểm tra đạt`; chỉ đọc các dòng trượt, không dán cả log vào trả lời.

## Trình duyệt
- Cả hai script đã dùng `gpuLaunchOptions()` từ `/root/.local/lib/gpu-browser/gpu-browser.mjs` (GPU RTX 4070) và luôn `browser.close()` trong `finally`. Không thêm `--use-angle=swiftshader`.
- Nghi lỗi do GPU: chạy lại với `BROWSER_GPU=0` và so hai ảnh.
- Lần đầu sau khi cài: `npm i -D playwright`; nếu thiếu Chromium thì `npx playwright install chromium`.

## Checklist cuối phase (ghi kết quả vào `docs/status.md`)
- [ ] `site-qa.mjs` đạt hết (console sạch, không tràn ngang, đúng 1 h1, chữ không ẩn, tương phản AA, giảm chuyển động / tắt JS vẫn đủ chữ).
- [ ] Chụp 375 và 1440 cho các phần đã đổi trong phase.
- [ ] Cảnh `lo-trinh`: cuộn ngược đúng; 1280×720 vừa màn (`node scripts/shot.mjs lo-trinh 1280` + kiểm tay).
- [ ] Form (P2 trở đi): gửi thử thấy dòng mới trong Sheet; tắt mạng thì thấy lỗi + nút Zalo; honeypot chặn.
- [ ] Không có `TODO(sophie)` nào lộ ra dạng dữ liệu giả.
- [ ] Trước bàn giao: `grep -r "aegis-web-kit" src` rỗng; Lighthouse mobile LCP < 2.5s, CLS = 0; Rich Results Test cho JSON-LD.

Chi tiết thủ công thêm (chỉ khi cần): `.claude/skills/aegis-web-kit/references/qa-checklist.md`.
