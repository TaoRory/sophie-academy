# 02 Dải kết quả (`ResultStrip.tsx`), id `ket-qua-strip`
- **Câu hỏi khách:** có ai học thành công chưa?
- **Dữ liệu:** `src/content/results.ts` (chỉ mục `showInStrip: true`). Thẻ: tên viết tắt ("Minh A."), nhóm (học sinh/sinh viên/đi làm), band **trước → sau**, số tháng học. Ít hơn 6 kết quả thật thì **không** làm băng chạy; hiển thị hàng tĩnh.
- **Bố cục:** dải tràn mép, nền `--paper`, cao ~120px. Link cuối dải "Xem tất cả kết quả" → `#ket-qua`.
- **Motion (T2 #1):** `VelocityMarquee`, nhanh/chậm theo tốc độ cuộn. **Bắt buộc nút tạm dừng** (luật kit: tự chạy >5s), có `aria-pressed`. Recipe gốc chưa có nút dừng: thêm prop `paused` vào bản chép trong `src/components/motion/`. Giảm chuyển động: đứng yên, cuộn ngang được.
- **Điện thoại:** chạy chậm, vuốt được; nút dừng vẫn có.
- **Xong khi:** không tràn ngang trang; trình đọc màn hình đọc danh sách một lần (bản nhân đôi để lặp đặt `aria-hidden`).
