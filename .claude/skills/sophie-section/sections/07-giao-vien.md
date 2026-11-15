# 07 Đội ngũ giáo viên (`Teachers.tsx`), id `giao-vien`
- **Câu hỏi khách:** ai dạy mình?
- **Dữ liệu:** `src/content/teachers.ts`: `{ slug, name, photo, band, strengths[], experience, quote?, featured?, certificate? }`. Ảnh ở `public/teachers/` (WebP, có `width/height`).
- **Bố cục:** **tấm navy bo góc 28px** nằm trong lề. Trái: giáo viên `featured` cỡ lớn (ảnh, tên, "IELTS 8.0", kinh nghiệm, câu nói). Phải/dưới: các giáo viên khác dạng hàng (ảnh tròn nhỏ, tên, band, chip thế mạnh: "Speaking", "Writing Task 2"). Bấm hàng → `Drawer` chi tiết (ảnh chứng chỉ nếu được đồng ý).
- **Motion:** ảnh nổi bật `Rise kind="wipe"` (clip-path; recipe ghi rõ wipe chỉ dùng cho ảnh, không cho chữ); `Tilt` nhẹ chỉ trên ảnh nổi bật (`MQ.fineHover`). Hàng: hover đổi nền 0.2s.
- **Điện thoại:** người nổi bật trên cùng; hàng thành băng trượt ngang có điểm bắt.
- **Chữ trên navy:** trắng / `#EEE`; band dùng `--brand` cỡ lớn (≥24px, đạt 5.55:1).
