# Sophie IELTS: landing page

Landing một trang thu lead cho Sophie IELTS (IELTS 1 kèm 1 online). Kế hoạch đầy đủ: `docs/master-plan.md`. **Không đọc lại cả file đó khi làm việc thường ngày**; dùng các skill dưới đây, chúng đã tách sẵn phần cần thiết.

## Bắt đầu mỗi phiên
1. Đọc `docs/status.md` (giai đoạn hiện tại, việc đang dở, thứ đang chờ Sophie).
2. Chỉ mở skill / file đúng với việc đang làm (bảng dưới).
3. Xong một đơn vị việc thì cập nhật `docs/status.md`: đánh dấu, ghi quyết định mới, ghi lỗi đã gặp.

## Đang làm gì → đọc gì
| Việc | Đọc |
|---|---|
| Màu, font, logo, mascot, giọng văn, dữ kiện thật | skill `sophie-brand` |
| Dựng / sửa một phần của trang | skill `sophie-section` → **chỉ** file spec của phần đó |
| Animation, cài nền chuyển động | `sophie-section` đã ghi recipe cần dùng; cần sâu hơn mới mở `.claude/skills/aegis-web-kit/` đúng file được trỏ tới |
| Kiểm tra, chụp màn hình, QA | skill `sophie-qa` |
| Sửa chữ, thêm giáo viên / kết quả / FAQ | chỉ sửa `src/content/*.ts`, không đụng component |

## Cấu trúc thư mục
```
CLAUDE.md                 # file này, giữ dưới 80 dòng
docs/master-plan.md       # plan gốc đã duyệt (tham chiếu, ít đọc)
docs/status.md            # trạng thái sống: phase, checklist, chờ Sophie, quyết định
.claude/settings.json     # quyền + chặn đọc thư mục build/binary
.claude/skills/
  sophie-brand/           # token, logo, giọng văn, dữ kiện
  sophie-section/         # chỉ mục 13 phần + mỗi phần một file spec
  sophie-qa/              # QA tối thiểu theo phần vừa sửa
  aegis-web-kit/          # kit gốc (không commit, xóa khi bàn giao)
assets/brand-source/      # file gốc từ Drive (PNG 4K, .ai, PDF): KHÔNG đọc, chỉ xử lý bằng script
assets/brand/             # logo SVG đã chuẩn hóa màu (nguồn để chép vào public/)
scripts/                  # site-qa.mjs (GPU), shot.mjs (chụp 1 phần)
src/app/                  # page.tsx, cam-on/, chinh-sach-bao-mat/, api/lead/, not-found.tsx
src/sections/             # mỗi phần một file, tên theo id trong sophie-section
src/content/              # toàn bộ chữ và dữ liệu (teachers, results, faq, painPoints, estimatorRules, site)
src/components/motion/    # recipe chép từ kit (SplitReveal, Rise, ...)
src/components/ui/        # Button, Chip, Tabs, Accordion, Drawer
src/lib/                  # motion.ts, motion-boot.ts, lead.ts
src/styles/               # tokens.css, motion.css
public/brand/             # logo, mascot đã tối ưu
```

## Luật cứng (rút gọn từ kit, đủ để không phải mở kit)
- Không bịa số liệu, giá, lời chứng thực, logo. Thiếu dữ liệu thì để khung chờ `TODO(sophie)` và ghi vào `docs/status.md`.
- Chữ không bao giờ bắt đầu ẩn (`opacity:0`) chờ cuộn; trạng thái chờ animation chỉ viết dưới `html[data-motion="on"]`.
- Chỉ animate `transform`, `opacity`, `clip-path`, biến CSS. GSAP import từ `@/lib/motion`, nằm trong `useGSAP` + `gsap.matchMedia()`.
- Ghim/scrub chỉ trên máy tính. Mỗi trang tối đa 2 cảnh T2, 1 vật thể T3, không WebGL.
- Không import gì từ `.claude/skills/aegis-web-kit/`; mã phải chép vào `src/`.
- Chữ trắng trên nền cam bị cấm (2.4:1). Nút cam dùng chữ navy.

## Tiết kiệm token
- Tìm bằng Grep/Glob trước, đọc file theo `offset/limit`; không đọc `react-bits-catalog.md` cả file, grep tên component.
- Không mở ảnh trong `assets/brand-source/`; mọi dữ kiện trong ảnh đã chép thành chữ ở `sophie-brand`.
- Kiểm tra hình ảnh bằng `scripts/shot.mjs <id-phần>` (chỉ chụp phần vừa sửa, một khổ màn hình), không chụp cả trang.
- QA đầy đủ (`scripts/site-qa.mjs`) chỉ chạy ở cuối mỗi phase, không chạy sau mỗi lần sửa nhỏ.
- Tìm kiếm rộng nhiều file thì giao subagent Explore và chỉ nhận kết luận.
