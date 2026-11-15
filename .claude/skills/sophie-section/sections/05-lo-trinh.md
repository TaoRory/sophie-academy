# 05 Lộ trình (`Roadmap.tsx`), id `lo-trinh`: cảnh chữ ký
- **Câu hỏi khách:** học thế nào, bắt đầu ra sao?
- **5 mốc** (`src/content/roadmap.ts`), tiêu đề mệnh lệnh có dấu chấm + 1–2 câu:
  1. **Kiểm tra đầu vào.** Đo 4 kỹ năng, nói chuyện về mục tiêu và hạn thi.
  2. **Nhận lộ trình riêng.** Thứ tự kỹ năng, số buổi mỗi tuần, mốc tháng.
  3. **Học 1-1 và làm bài tập.** Giáo viên sửa trực tiếp; bài tập bắt buộc.
  4. **Kiểm tra mỗi tháng, chỉnh lộ trình.** Một bài tổng hợp mỗi tháng.
  5. **Đi thi.** Luyện đề sát ngày thi.
  (Mốc 1 có chữ "miễn phí" chỉ khi Sophie xác nhận.)
- **Hình bên phải** đổi theo mốc: minh họa HTML (phiếu kết quả đầu vào, bảng lộ trình, thẻ sửa bài, phiếu nhận xét tháng, lịch thi). Ghi "Minh họa".
- **Motion (T2 #2):** `usePinProgress(ref, { onProgress: p => setStep(Math.min(4, Math.floor(p*5*0.999))) })`, `.kit-pin { --kit-pin-length: 300vh }`. Đường `tail.svg` kéo dài thành path dọc uốn S đi qua 5 mốc, `pathLength={1}` + `.kit-draw` theo `--p`. Mốc đang đọc `data-active` đổi màu `--ink`, mốc khác `--muted`. Hình phải cross-fade 0.3s.
- **Điện thoại / giảm chuyển động:** không ghim; danh sách dọc có số 1–5, đường vẽ sẵn, hình minh họa nằm dưới từng mốc (rút gọn).
- **Xong khi:** cuộn ngược chạy đúng; 1280×720 và 1366×768 vừa một màn; đổi kích thước giữa cảnh không vỡ.
