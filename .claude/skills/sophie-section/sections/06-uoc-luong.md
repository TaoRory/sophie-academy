# 06 Ước lượng lộ trình (`Estimator.tsx`), id `uoc-luong`: vật thể T3
- **Câu hỏi khách:** mình cần học bao lâu, tập trung gì?
- **Đầu vào (chip):** Bạn là (lấy sẵn từ `AudienceContext` của phần 03) · Band hiện tại (Chưa thi, 3.0–3.5, 4.0–4.5, 5.0–5.5, 6.0–6.5) · Mục tiêu (5.5, 6.0, 6.5, 7.0, 7.5+) · Hạn thi (≤3 tháng, 3–6, 6–12, chưa có).
- **Kết quả:** thanh xếp hạng ưu tiên 4 kỹ năng + gợi ý buổi/tuần + **khung số tháng tham khảo**. Quy tắc trong `src/content/estimatorRules.ts`.
  - Chưa có bảng quy tắc của Sophie (`estimatorRules.status === "pending"`): **ẩn số tháng**, chỉ hiện thứ tự ưu tiên kỹ năng và câu "Sophie chốt số buổi sau kiểm tra đầu vào".
  - Luôn có dòng: "Ước lượng tham khảo, lộ trình chính thức chốt sau kiểm tra đầu vào."
- **CTA:** "Gửi để nhận lộ trình chính xác" → điền sẵn các lựa chọn vào form `#dang-ky` (qua context hoặc query string) rồi cuộn tới.
- **Motion:** GSAP Flip khi thanh kỹ năng đổi thứ tự; handler bọc `contextSafe`. Không phụ thuộc con trỏ → giữ nguyên trên điện thoại.
- **Đo lường:** sự kiện `estimator_use` (lần đầu chọn đủ).
- **A11y:** chip là `radio` trong `radiogroup`; kết quả trong `aria-live="polite"`.
