# 12 Lời mời cuối + form (`FinalCta.tsx`), id `dang-ky`
- **Bố cục:** **hai ô lớn cạnh nhau** (không phải dải căn giữa). Ô trái nền `--brand`: form. Ô phải nền trắng viền: Chat Zalo + mã QR + hotline (từ `site.ts`).
- **Tiêu đề:** "Nhận lộ trình riêng" (+ "trong 24h" chỉ khi Sophie xác nhận). Chữ trên ô cam là `--ink`.
- **Trường form** (`src/lib/lead.ts` chứa schema zod dùng chung client/server): họ tên* · SĐT/Zalo* (kiểm số VN) · Bạn là* (học sinh/sinh viên/đi làm; học sinh thì thêm "Người liên hệ: phụ huynh/học sinh") · band hiện tại · mục tiêu · hạn thi · khung giờ rảnh · ghi chú · ô đồng ý chính sách* (link `/chinh-sach-bao-mat`) · honeypot ẩn · UTM ẩn.
- **Gửi:** POST `/api/lead` → kiểm zod → chặn honeypot + giới hạn tần suất theo IP → `fetch(LEAD_WEBHOOK_URL)` (Apps Script, có `LEAD_WEBHOOK_SECRET`) → 200 thì `router.push("/cam-on")`. Lỗi: thông báo thật + nút Zalo dự phòng. **Không giả lập thành công.**
- **Điền sẵn:** nhận giá trị từ phần 06 (Estimator).
- **Motion:** nút gửi có trạng thái đang gửi; lỗi trường hiện dưới ô, focus vào ô lỗi đầu tiên.
- **Đo lường:** `lead_submit` khi 200.
