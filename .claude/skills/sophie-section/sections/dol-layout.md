# Bố cục kiểu DOL English (owner yêu cầu 15/11/2026)
Tham chiếu: dolenglish.vn. Giữ màu, font, dữ kiện Sophie; chỉ mượn bố cục và nhịp. Nội dung: `src/content/home.ts` (+ `results`, `teachers`, `testimonials`, `faq`, `roadmap`).

## Ngôn ngữ chung
- Nền trắng xen `--paper`; tiêu đề phần **căn giữa**, một cụm nhấn màu `--accent-text` (#CC6E10, chỉ cho chữ lớn): dùng `components/ui/SectionHeading` (`before`/`accent`/`after`, `tag` viên viền cam, `sub`).
- Thẻ trắng viền mảnh bo `--r-card`/`--r-sheet`; nhóm thẻ dạng "một khung chia cột" (hero, liên hệ).
- Icon nét: `components/ui/Icon` (không emoji).
- Chuyển động theo chất riêng "Bút sửa bài": xem `pen-identity.md`. Không cảnh ghim, không mèo chuyển động.
- Mèo: `Mascot` (mèo + chữ S của logo) **ngồi yên** trên tờ bài ở hero (owner: "về như cũ, không chuyển động").

## Thứ tự (src/app/page.tsx)
| id | File | Bố cục |
|---|---|---|
| — | `AnnouncementBar` | Dải `--brand-soft` trên cùng, đóng được |
| header | `components/Header` | Logo, nav (Bảng vàng, Vì sao 1-1, Lộ trình, Giáo viên, Hỏi đáp), nút cam |
| hero | `Hero` | Viên chương trình · H1 2 dòng · câu phụ · hàng 3 dữ kiện chia vạch · CTA · thẻ nghiêng 2 bên (≥1280px, minh họa + mèo) · khung 3 thẻ chương trình theo đối tượng → `#uoc-luong` |
| tuyen-ngon | `Statement` | Câu tuyên ngôn trên giấy kẻ (sau Bảng vàng), xem pen-identity |
| tim-loi | `FixTheMistake` | Trò tìm lỗi sai (sau Giá trị), xem pen-identity |
| bang-vang | `HallOfFame` | Lưới 4 cột thẻ học viên, dải điểm cam ở góc, lọc theo nhóm (chỉ khi có dữ liệu); trống = 4 thẻ chờ |
| gia-tri | `Values` | Thẻ lớn: nội dung trên (badge, tiêu đề, checklist 2 cột, hình minh họa từ `RoadmapVisuals`), 3 tab ở đáy |
| lo-trinh | `Journey` | 5 thẻ bước có số, nối bằng đường kẻ (máy tính) |
| giao-vien | `Teachers` | Khung viền cam bo lớn, băng thẻ chân dung có chip "IELTS 8.0", cuộn ngang có điểm bắt; trống = thẻ chờ |
| cam-nhan | `Reviews` | Băng thẻ trích dẫn/ảnh tin nhắn; trống = thẻ chờ |
| hoc-online | `HowOnline` | Hàng 5 tiện ích có icon (từ nội quy) + viên slogan |
| uoc-luong | `Estimator` | Giữ công cụ ước lượng (chip + Flip), tiêu đề căn giữa |
| hoi-dap | `Faq` | Accordion 1 cột 860px, JSON-LD FAQPage |
| dang-ky | `FinalCta` | Khung 3 thẻ liên hệ (Zalo, hotline, để lại thông tin) + form trên nền cam (`#form-dang-ky`) |
| footer | `components/Footer` | Navy tràn ngang, 4 cột, dòng bản quyền |
| — | `components/FloatingCta` | ≥1440px: 3 tab dính mép phải; ≥1024px: nút lên đầu trang + Zalo; điện thoại: thanh CTA đáy |

## Đã kiểm (15/11/2026)
site-qa 30/30, p95 16.8ms; CTA hero trong màn đầu ở 1280×720, 1366×768, 375×667; form báo lỗi thật khi chưa có webhook; ước lượng điền sẵn form.
