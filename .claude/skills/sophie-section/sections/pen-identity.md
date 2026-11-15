# Chất riêng "Bút sửa bài" (owner chốt 15/11/2026)
Ý tưởng xuyên suốt: giấy kẻ dòng như bài thi + nét bút cam của giáo viên tự vẽ. Đúng cốt lõi 1 kèm 1: sửa từng lỗi.
Ràng buộc owner: **không tô nền sau chữ**, **mèo không chuyển động**, giữ bố cục DOL (`dol-layout.md`).

## Thành phần (`src/components/pen/`)
- `penPaths.ts`: nét vẽ tay `tick`, `circle`, `arrow`, `star`, `strike`, `underline`, `bracket`.
- `PenMark`: `play="inView" | "scrub" | "manual" | "static"`, `inViewStart`, `delay`, `strokeWidth`, `preserveAspectRatio="none"` (kéo giãn, nét không méo). Trang trí: aria-hidden.
- `DrawIcon`: icon nét tự vẽ khi vào màn hình.
- `LiveCorrection`: tờ bài ở hero (chữ ký T4): gạch "believes"/"make" → viết "believe"/"makes" bằng chữ tay → khoanh "partly disagree" → mũi tên + "Nêu rõ lý do nhé" → tích + "Sửa ngay trong buổi học". Chạy 1 lần (~3s, trễ 1.1s), nút "Xem lại".
- CSS (`tokens.css`): `.paper-ruled`, `.paper-margin` (biến `--paper-margin`, `--rule-gap`), `.font-hand` (Pangolin, có tiếng Việt), `.pen-wait`, `.draw-wait`, `.card-lift`, `.field-pen`, `.hero-paper`.

## Cảnh
| Phần | Tầng | Ghi chú |
|---|---|---|
| Hero tờ bài | T4 | ≥1536px nghiêng bên phải; nhỏ hơn: dưới CTA (margin-top 7.5rem để mèo không đè CTA) |
| `Statement` (#tuyen-ngon) | **T2 #1** | Nền navy: SplitText words, màu `#9da2c4` → trắng theo cuộn; vòng bút quanh "sửa ngay" là **lớp phủ đo vị trí** (không đặt trong đoạn bị tách) |
| `FixTheMistake` (#tim-loi) | **T3** | 3 câu trong `content/mistakes.ts`; từ là `<button>`; đúng: gạch + viết + tích; sai: khoanh lỗi thật; kết quả aria-live |
| `Journey` (#lo-trinh) | **T2 #2** | Nền cam, nét bút navy (`--pen`); nét cong qua tâm 5 vòng số (đo DOM, Catmull-Rom), DrawSVG scrub; tích bật/tắt theo tiến độ; ngang (máy tính) / dọc (điện thoại) |
| Tiêu đề phần | T1 | `SectionHeading` dùng `SplitReveal trigger="scroll"` |
| Giá trị | T1 | Tích bút so le; đổi tab: hình "đặt xuống bàn" |
| Bảng vàng | T1 | Dải điểm `.stamp` đóng dấu (khi có dữ liệu) |
| Học online | T1 | `DrawIcon` |
| Thẻ, form | T0 | `.card-lift` (nhấc + tích góc), `.field-pen` (gạch dưới ô đang nhập) |

## Bài học kỹ thuật (đã gặp thật)
- **SplitText + React:** SplitText dựng lại / khôi phục DOM bằng innerHTML → component React (có ref, có tween) đặt *bên trong* đoạn bị tách sẽ bị thay bằng bản chép (tween chạy trên phần tử đã gỡ). `ignore` không đủ. Đặt nét bút ngoài đoạn chữ, định vị bằng đo (`Statement.tsx`).
- **Nét chờ vẽ hiện thành chấm:** dash dài 0 + đầu tròn vẫn vẽ chấm. `.pen-wait`/`.draw-wait` đặt `stroke-linecap: butt` khi chờ.
- Không dùng `pathLength` cùng DrawSVG (DrawSVG đo độ dài thật).
- Lenis ghi đè `window.scrollTo`: test cảnh cuộn bằng `mouse.wheel`.

## Đã kiểm (15/11/2026)
site-qa 30/30, p95 16.8ms; CTA hero trong màn đầu 1280×720 / 1366×768 / 375×667; giảm chuyển động + không JS: tờ bài hiện bản đã sửa, 0 nét bị ẩn; trò chơi: đúng / sai (bàn phím) / kết quả.
