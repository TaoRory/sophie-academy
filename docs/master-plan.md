# Master plan: Landing page Sophie IELTS

## Context

Sophie IELTS cần một landing page để thu lead (đăng ký tư vấn và lộ trình). Thư mục dự án `/root/Kanna/sophie-ielts` hiện chỉ có `aegis-web-kit/`, chưa có mã. Plan này chốt bốn việc: định vị, bố cục nội dung từng phần, UI/motion theo aegis-web-kit, và cách triển khai kỹ thuật.

**Dữ kiện thật từ Drive của brand** (đã xem ảnh, chưa xem được file `.ai`/PDF gốc):
- Màu: navy `#232A60`, xám nền `#EEEEEE`, cam `#F28F20`.
- Logo: con mèo ngồi, đuôi mèo uốn thành chữ **S** của "Sophie". Có các bản cam trên navy, navy trên cam, cam trên trắng và bản trong suốt. Ảnh bìa có mascot mèo cam vẫy tay.
- Thông điệp có sẵn: "Experienced & Dedicated Teaching Team · IELTS 8.0", "Personal Learning Roadmap", 4 kỹ năng, slogan **"Học nghiêm túc – Tiến bộ từng ngày – Chinh phục mục tiêu IELTS"**.
- Nội quy: học **1 giáo viên – 1 học viên**; kiểm tra tổng hợp mỗi tháng để điều chỉnh lộ trình; đổi lịch cố định báo trước 1 tuần, đổi tạm báo trước 1 ngày; học phí không hoàn nhưng được bảo lưu hoặc chuyển nhượng; bài tập về nhà bắt buộc.

**Bạn đã chốt:** học online 1-1 (Zoom/Meet); đã có hồ sơ giáo viên, bảng điểm và feedback thật; **không** công khai học phí; lead ghi vào **Google Sheet**, kèm nút **Zalo**; nhắm cả ba nhóm học viên: học sinh THCS/THPT (phụ huynh quyết định), sinh viên và người đi làm.

**Lời chào hàng một dòng** (luật đầu tiên của playbook):
> IELTS 1 kèm 1 online: giáo viên 8.0 dạy riêng bạn, theo lộ trình được đo lại mỗi tháng.

---

## 1. Học gì từ các trung tâm lớn, và Sophie khác ở đâu

| Trang | Đáng học | Sophie làm khác |
|---|---|---|
| **DOL** (dolenglish.vn) | "Bảng vàng" học viên đặt gần đầu trang, mỗi thẻ có nút "Xem bảng điểm". Thẻ giáo viên ghi band ("8.5 IELTS Overall") và chức danh. Một phương pháp độc quyền có tên riêng (Linearthinking). Review dài của phụ huynh. Nút Zalo/Messenger nổi, thanh điều hướng dưới đáy trên điện thoại, thẻ CTA dính bên phải trên máy tính. | Sophie không có phương pháp có thương hiệu, nên tâm điểm là **mô hình 1-1 kèm lộ trình đo lại mỗi tháng**. Không làm mega-menu, vì chỉ có một dịch vụ. |
| **ZIM** (zim.vn) | Hero "One Learner, One Journey" đánh vào cá nhân hóa. Hai CTA: kiểm tra trình độ và tư vấn. Khối cuối "Không tìm thấy câu trả lời?" dẫn sang chat với cố vấn kèm hotline. | ZIM nói cá nhân hóa nhưng vẫn học theo lớp. Sophie **thực sự** học 1-1, nên trang phải chứng minh điều đó bằng hình ảnh một buổi học cụ thể. |
| **The IELTS Workshop** | Chọn khóa theo dải band (0–2.5, 2.5–4.5…). Hồ sơ founder kèm câu nói riêng. Form có ô "đối tượng" và "mục tiêu". | Lấy ý tưởng "chọn theo band" để làm **công cụ ước lượng lộ trình** (mục 4, phần 6). |
| **Prep** | Quy trình 3 bước: lộ trình cá nhân, học và theo dõi, hỗ trợ đăng ký thi. Thẻ điểm có đủ 4 kỹ năng (L/R/W/S). | Thẻ kết quả của Sophie ghi **trước → sau** và số tháng học, không chỉ điểm cuối. |

Cả bốn trang đều thuộc kiểu "trung tâm lớn": nhiều khóa, nhiều cơ sở, số liệu hàng chục nghìn học viên. Sophie không nên bắt chước quy mô đó. Lợi thế của Sophie là **sự riêng tư và theo sát**. Giọng văn nên giống một người thầy kèm riêng nói chuyện với học viên, không giống một hệ thống bán khóa.

---

## 2. Hướng thiết kế

### Chữ ký thị giác: đường đuôi mèo hình chữ S
Đuôi mèo trong logo thành **một nét SVG uốn lượn**, được dùng lại có chủ đích ở ba nơi:
1. Hero: nét đuôi nối từ mascot chạy xuống, dẫn mắt sang CTA.
2. Cảnh "Lộ trình" (cảnh ghim): đường đi qua các mốc học, **tự vẽ dần theo thanh cuộn**.
3. Gạch chân cong dưới từ khóa của tiêu đề (biến thể của `.kit-mark`).

Chỉ dùng **một** chữ ký này, không thêm blob, gradient hay kính mờ.

**Động từ thương hiệu:** *dẫn đường*. Mọi chuyển động chính minh họa việc "có người dẫn bạn từ band hiện tại tới band mục tiêu".

### Token
| Token | Giá trị | Quy tắc |
|---|---|---|
| `--ink` | `#232A60` | Chữ chính, tấm tối, footer. Trên trắng đạt 13.4:1. |
| `--brand` | `#F28F20` | Khối nhấn, nút chính, nét đuôi. **Không dùng làm màu chữ trên nền sáng** (chỉ 2.4:1). |
| `--paper` | `#EEEEEE` / `#FFFFFF` | Nền xen kẽ. |
| `--brand-ink` | `#A65400` | Màu cam đậm, chỉ dùng khi bắt buộc phải có chữ cam trên nền trắng (đạt 5.4:1). |
| `--muted` | `#4A5070` | Chữ phụ trên `#EEE` đạt 6.8:1 (playbook yêu cầu khoảng 7:1). |
| Nút chính | Nền cam, **chữ navy** (5.55:1) | Không dùng chữ trắng trên nền cam. |
| Nút phụ | Nền navy, chữ trắng; hoặc viền navy | |

- **Font:** tiêu đề dùng **Nunito** 800–900, cùng dáng bo tròn với logo. Nội dung dùng **Be Vietnam Pro** 450–500. Cả hai đều có đủ dấu tiếng Việt; vẫn phải kiểm lại các dấu chồng như Ế, Ỗ, Ữ khi cài. Line-height tiêu đề 1.12–1.16.
- **Bo góc ba cấp** theo playbook: tấm 28px, thẻ 16px, nút bo tròn hẳn. Tính cách thân thiện của mascot cho phép bo mềm.
- **Mascot:** chỉ xuất hiện ở ba chỗ: hero, trạng thái gửi form thành công, trang 404. Lấy vector từ `FILE GỐC.ai`, không vẽ lại và không dùng ảnh AI.
- **Nhịp sáng tối:** tối đa hai tấm navy bo góc nằm trong lề trang (phần Giáo viên và Footer). Tấm cam dùng cho khối CTA cuối.

---

## 3. Cấu trúc site

Landing **một trang** (Sophie chỉ có một dịch vụ, nên đúng tiêu chí của playbook), cộng ba trang phụ:
- `/` là landing.
- `/cam-on`: trang cảm ơn sau khi gửi form, có mascot, bước tiếp theo và nút Zalo. Đây cũng là điểm đo chuyển đổi.
- `/chinh-sach-bao-mat`: bắt buộc, vì form thu số điện thoại (Nghị định 13/2023 về bảo vệ dữ liệu cá nhân).
- Trang 404 có mascot.

Điểm neo của menu: Vì sao 1-1 · Lộ trình · Giáo viên · Kết quả · Hỏi đáp · nút **"Nhận lộ trình riêng"**.

---

## 4. Bố cục nội dung từng phần (master layout)

Mỗi phần trả lời một câu hỏi của khách. Hai phần liền nhau không dùng chung một khuôn bố cục.

| # | Phần | Khách đang hỏi | Nội dung | Kiểu bố cục |
|---|---|---|---|---|
| 0 | **Header dính** | — | Logo, các điểm neo, nút "Nhận lộ trình riêng". Trên điện thoại chỉ còn logo, CTA và nút Menu. | Header thu nhỏ sau 80px cuộn. |
| 1 | **Hero** | Đây là gì, có hợp với mình không? | H1 là lời chào hàng, có gạch chân đuôi mèo dưới "dạy riêng bạn". Phụ đề hai sắc độ (navy và xám). Hai CTA: **Nhận lộ trình riêng** và **Chat Zalo**. Bốn chip L/R/W/S. Bên phải là **mô hình HTML một buổi học 1-1** (khung video gọi giáo viên dùng ảnh thật, bên cạnh là một câu Writing đang được sửa trực tiếp), ghi chú "minh họa". Mascot ngồi ở góc, đuôi nối thành đường dẫn. | Chữ căn trái, mô hình bên phải, sản phẩm hiện ngay trong màn đầu. |
| 2 | **Dải kết quả** | Có ai học thành công chưa? | Băng chạy các thẻ điểm thật (tên viết tắt, band trước → sau, số tháng), có nút tạm dừng và link "Xem tất cả kết quả" xuống phần 7. | Dải ngang tràn mép, nền `#EEE`. |
| 3 | **"Bạn có thấy quen không?"** | Họ có hiểu vấn đề của mình không? | Một câu lớn hai sắc độ. Ba tab **Học sinh · Sinh viên · Người đi làm**; mỗi tab là 4–5 nỗi đau dạng hàng kẻ dòng. Ví dụ học sinh: "Lớp 25 bạn, con ít khi được sửa bài". Người đi làm: "Chỉ học được 21h, lớp toàn giờ cố định". Chuyển tab đổi cả ví dụ ở phần 6. | Tab cùng các hàng kẻ, không thẻ, không icon. |
| 4 | **Vì sao 1 kèm 1** | Khác gì lớp đông, gia sư tự do? | **Bảng so sánh định tính** ba cột: Lớp đông / Gia sư tự do / **Sophie 1-1** (cột Sophie tô cam nhạt). Các hàng: thời gian được nói và sửa bài; lộ trình riêng; kiểm tra tiến độ mỗi tháng; đổi lịch linh hoạt; giáo viên band 8.0+; có quy trình và nội quy rõ. Chỉ ghi điều Sophie bảo đảm được. | Bảng; trên điện thoại trượt ngang có điểm bắt. |
| 5 | **Lộ trình của bạn tại Sophie** (cảnh chữ ký) | Học thế nào, bắt đầu ra sao? | Năm mốc, tiêu đề dạng mệnh lệnh ngắn: **Kiểm tra đầu vào. → Nhận lộ trình riêng. → Học 1-1 và làm bài tập. → Kiểm tra mỗi tháng, chỉnh lộ trình. → Đi thi.** Đường đuôi mèo vẽ dần qua từng mốc, mốc đang đọc sáng lên, bên phải đổi hình minh họa tương ứng (ví dụ phiếu nhận xét tháng). | Cảnh ghim: danh sách bên trái điều khiển hình bên phải. |
| 6 | **Ước lượng lộ trình** (vật thể tương tác) | Mình cần học bao lâu, tập trung gì? | Ba lựa chọn: *Bạn là* (lấy từ tab ở phần 3), *Band hiện tại* (gồm "chưa thi"), *Mục tiêu*. Kết quả: **thứ tự ưu tiên kỹ năng** và **khung số tháng tham khảo** theo bảng quy tắc do Sophie cung cấp, ghi rõ "ước lượng tham khảo, lộ trình chính thức chốt sau kiểm tra đầu vào". Nút "Gửi để nhận lộ trình chính xác" điền sẵn các lựa chọn vào form ở phần 10. | Một khối lớn nền trắng, chọn bằng chip, kết quả hiện ngay. |
| 7 | **Đội ngũ giáo viên** | Ai dạy mình? | **Tấm navy bo góc.** Một giáo viên nổi bật (founder hoặc trưởng chuyên môn) cỡ lớn, kèm ảnh, band, kinh nghiệm và một câu nói riêng. Các giáo viên còn lại xếp dạng hàng hoặc băng trượt ngang (ảnh, tên, band, thế mạnh như "Speaking", "Writing Task 2"). Bấm vào mở ngăn chi tiết, có ảnh chứng chỉ nếu được đồng ý. | Một người nổi bật cùng danh mục dạng hàng. |
| 8 | **Kết quả và câu chuyện** | Bằng chứng đâu? | Một câu chuyện lớn: học viên thật, band trước → sau, số tháng, trích lời, ảnh bảng điểm. Bên dưới là lưới ảnh bảng điểm thật, bấm để phóng to. Thông tin cá nhân trên bảng điểm phải che. | Câu chuyện lớn trên nền cam nhạt, lưới bảng điểm bên dưới. |
| 9 | **Học viên và phụ huynh nói gì** | Người khác thấy thế nào? | Ảnh chụp tin nhắn Zalo/Messenger thật (đã che thông tin cá nhân) cùng trích dẫn ngắn có tên và vai trò (phụ huynh, sinh viên…). | Lưới so le kiểu masonry; trên điện thoại trượt ngang có điểm bắt. |
| 10 | **Học online 1-1 diễn ra thế nào** | Thực tế mỗi tuần ra sao? | Danh sách bên trái, mỗi mục đổi hình bên phải: Zoom/Meet, tài liệu và bài tập, kiểm tra tháng, đổi lịch (báo trước 1 tuần hoặc 1 ngày), bảo lưu hoặc chuyển nhượng. Toàn bộ lấy từ nội quy thật. | Bố cục hai cột khác phần 5: không ghim, bấm để đổi. |
| 11 | **Hỏi đáp** | Còn băn khoăn gì? | 8–10 câu: học phí (dẫn sang tư vấn, không ghi số), giáo viên có cố định không, học bù thế nào, có hoàn phí không (trả lời đúng theo nội quy), cần thiết bị gì, học thử, phụ huynh theo dõi tiến độ ra sao… Gắn JSON-LD FAQPage. | Hai cột: tiêu đề bên trái, các hàng mở ra bên phải. |
| 12 | **Lời mời cuối** | Bắt đầu thế nào? | **Hai ô lớn cạnh nhau.** Ô cam là **form** gồm họ tên, SĐT/Zalo, bạn là, band hiện tại, mục tiêu, hạn thi, khung giờ rảnh, ô đồng ý chính sách. Ô trắng là **Chat Zalo** kèm mã QR và hotline. Tiêu đề: "Nhận lộ trình riêng trong 24h" (con số 24h cần Sophie xác nhận). | Hai ô, không phải một dải căn giữa. |
| 13 | **Footer** | — | Tấm navy bo góc, chữ "Sophie" khổ lớn kèm mèo, slogan, liên hệ, mạng xã hội, link chính sách. | |
| ⊕ | **Nổi** | — | Nút Zalo góc phải dưới. Trên điện thoại có **thanh CTA dính đáy** ("Nhận lộ trình" và "Zalo"), chỉ hiện khi hero đã khuất. Không che quá 1/4 màn hình. | |

**Một lời mời duy nhất, lặp lại:** "Nhận lộ trình riêng" ở header, hero, phần 6, phần 12 và thanh đáy. Nút phụ luôn là "Chat Zalo".

---

## 5. Bảng phân cảnh chuyển động (theo `motion-strategy.md`)

Ngân sách của kit: **2 cảnh T2** (cảnh ghim lộ trình, băng kết quả), **1 vật thể T3** (công cụ ước lượng), **không có T4 WebGL**. Chữ ký của Sophie là nét SVG, không cần WebGL.

| Phần | Kích hoạt | Cái gì chuyển động | Nói lên điều gì | Tầng | Công cụ (recipe trong kit) | Điện thoại |
|---|---|---|---|---|---|---|
| Toàn trang | Luôn bật | Cuộn mượt; hover và focus; chữ trong nút cuộn lên khi rê chuột | Cảm giác chăm chút | T0 | `MotionProvider` (Lenis), `.kit-roll`, `Magnetic` cho nút hero | Cuộn gốc, bỏ `Magnetic` |
| Hero | Tải trang | H1 hiện theo dòng; gạch chân đuôi mèo tự vẽ; mô hình buổi học "lắp vào" (khung video rồi câu sửa bài gõ dần); mascot nháy mắt một lần | Có người dạy riêng bạn ngay lúc này | T1 | `SplitReveal trigger="load"`, `.kit-draw`, GSAP timeline | Giữ, rút ngắn timeline |
| Dải kết quả | Luôn chạy | Thẻ điểm chạy, nhanh chậm theo tốc độ cuộn | Kết quả thật, liên tục | T2 | `VelocityMarquee` cùng **nút tạm dừng** | Chạy chậm, vuốt được |
| Nỗi đau | Bấm tab | Đổi danh sách kèm khối nhấn trượt dưới tab | Trang hiểu đúng hoàn cảnh của tôi | T0 (UI) | CSS transition 300ms, GSAP Flip cho khối nhấn | Nút xếp chồng |
| So sánh | Vào màn hình | Cột Sophie trồi lên trước, dấu tích vẽ nét | Khác biệt nằm ở cột này | T1 | `Rise kind="pop"` | Giữ |
| **Lộ trình** | **Cuộn (ghim)** | **Đuôi mèo vẽ dần qua 5 mốc, mốc đang đọc sáng lên, hình bên phải đổi theo** | **Có người dẫn từ band hiện tại tới mục tiêu** | **T2** | `usePinProgress` (`--p`), `.kit-draw` | Không ghim: danh sách dọc có số, đường vẽ sẵn |
| Ước lượng | Bấm chip | Kết quả đổi bằng Flip; thanh ưu tiên kỹ năng trượt tới vị trí mới | Lộ trình được may đo cho bạn | T3 | GSAP Flip, `contextSafe` | Giữ (không phụ thuộc con trỏ) |
| Giáo viên | Vào màn hình, rê chuột | Ảnh nổi bật mở dần bằng `clip-path`; ảnh nghiêng nhẹ theo chuột | Con người thật | T1 + T0 | `Rise kind="wipe"`, `Tilt` (chỉ ảnh nổi bật) | Bỏ nghiêng |
| Kết quả và feedback | Vào màn hình | Khối trồi lên so le, chữ không bị ẩn | — | T1 | `Rise` | Giữ |
| Online 1-1 | Bấm mục | Hình bên phải chuyển bằng cross-fade | — | T0 (UI) | CSS | Accordion |
| Form | Gửi | Nút sang trạng thái gửi; thành công thì sang `/cam-on` có mascot vẫy tay | Đã nhận, có người phản hồi | T0 | CSS, View Transition | Giữ |

Kit đã có sẵn công thức cho mọi hiệu ứng trên. Cảnh lộ trình chỉ cần tự viết path SVG đuôi mèo, lấy từ file `.ai`.

**Cấm** (theo danh sách AI slop của kit): số đếm chạy cho số liệu không có nguồn, preloader, con trỏ tùy biến, mọi phần cùng trượt lên giống nhau, chữ tô gradient, kính mờ, hàng ba thẻ icon giống hệt nhau, eyebrow trên mọi tiêu đề.

---

## 6. Kỹ thuật

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + GSAP 3.15 + `@gsap/react` + Lenis. Đây là bộ kit đã kiểm theo `references/nextjs-setup.md`. Deploy lên Vercel.
- **Khởi tạo:** tạo app trong `/root/Kanna/sophie-ielts`, chuyển kit vào `.claude/skills/aegis-web-kit/` theo README của kit, và thêm đường dẫn đó vào `.git/info/exclude`.
- **Chép từ kit sang `src/`** theo `nextjs-setup.md` mục 2:
  - `recipes/lib/motion.ts` → `src/lib/motion.ts`
  - `motion-boot.ts` → `src/lib/motion-boot.ts`
  - `MotionProvider.tsx` → `src/components/motion/MotionProvider.tsx`
  - `motion.css` → `src/styles/motion.css`
  - `SplitReveal`, `Rise`, `Magnetic`, `Tilt`, `VelocityMarquee`, `usePinProgress` → `src/components/motion/`
  - Đổi màu của `.kit-mark` và `.kit-draw` sang token của Sophie.
- **Cấu trúc:**
  ```
  src/app/(site)/page.tsx, cam-on/, chinh-sach-bao-mat/, not-found.tsx
  src/app/api/lead/route.ts        # kiểm hợp lệ, chặn bot (honeypot), giới hạn tần suất, gọi Apps Script
  src/sections/*.tsx               # mỗi phần ở mục 4 là một file
  src/content/*.ts                 # teachers, results, testimonials, faq, painPoints, estimatorRules (sửa nội dung không đụng mã)
  src/components/ui/               # Button, Chip, Tabs, Accordion, Drawer (lấy cấu trúc từ 21st.dev nếu tiết kiệm công)
  public/brand/                    # logo SVG, mascot SVG, path đuôi mèo
  ```
- **Lead:**
  - Form gửi tới `/api/lead`, route này gọi **Google Apps Script Web App** và ghi vào Sheet (cột thời gian, các trường của form, UTM, trang nguồn).
  - URL của Apps Script để trong biến môi trường `LEAD_WEBHOOK_URL`, kèm một khóa bí mật chung giữa hai bên.
  - Không giả lập gửi thành công: lỗi thì báo lỗi và hiện nút Zalo dự phòng.
  - Ghi UTM từ URL vào form, vì các trung tâm này chạy quảng cáo Facebook và Google.
- **SEO:**
  - `metadata` tiếng Việt; ảnh OG dựng từ ảnh bìa.
  - JSON-LD gồm `EducationalOrganization`, `Course` (IELTS 1-1 online) và `FAQPage`.
  - Thêm `sitemap.ts` và `robots.ts`.
- **Đo lường (tùy chọn, bật khi Sophie đưa ID):** GA4 và Meta Pixel. Sự kiện cần ghi: `lead_submit`, `zalo_click`, `estimator_use`.

---

## 7. Sophie cần gửi gì (chặn tiến độ nếu thiếu)

1. File `FILE GỐC.ai` xuất ra **SVG**: logo, mascot vẫy tay, mascot ngồi. Agent không đọc được Illustrator nên cần Sophie xuất giúp.
2. Hồ sơ giáo viên: ảnh chân dung, tên, band, thế mạnh, kinh nghiệm, một câu nói riêng, cho biết ai là người nổi bật.
3. Bảng điểm và feedback đã có đồng ý đăng; mỗi kết quả kèm band trước → sau và số tháng học.
4. **Bảng quy tắc ước lượng**: mỗi bước tăng 0.5 band mất khoảng bao nhiêu tháng nếu học bao nhiêu buổi một tuần. Thiếu bảng này thì công cụ chỉ hiện thứ tự ưu tiên kỹ năng, không hiện số tháng.
5. Xác nhận các ưu đãi có thật hay không: kiểm tra đầu vào miễn phí, học thử, phản hồi trong 24h.
6. Liên hệ: số Zalo hoặc Zalo OA, link Facebook/TikTok, email, tên pháp nhân cho footer và trang chính sách.
7. Quyền truy cập Google Sheet nhận lead, hoặc agent tạo sẵn Apps Script rồi gửi Sophie dán vào.

---

## 8. Các giai đoạn

| Giai đoạn | Việc | Xong khi |
|---|---|---|
| P0 Nền | Khởi tạo Next, cài nền chuyển động từ kit, token màu và font, Header/Footer, nút Zalo | Trang trắng có header/footer, qua `site-qa` |
| P1 Nội dung tĩnh | Dựng 13 phần ở mục 4 **chưa có hiệu ứng**, dữ liệu trong `src/content`; phần còn thiếu tài sản dùng khung chờ ghi rõ "chờ Sophie" | Đọc trọn trang trên 375 / 768 / 1280 / 1440px |
| P2 Form | `/api/lead`, Apps Script, `/cam-on`, chính sách bảo mật | Gửi thật vào Sheet; lỗi mạng thì hiện thông báo kèm nút Zalo |
| P3 Motion T0–T1 | Hover/focus, `SplitReveal` cho H1, `Rise`, gạch chân đuôi mèo, mô hình hero | Qua `site-qa`, không chữ nào bị ẩn |
| P4 T2 + T3 | Cảnh ghim lộ trình, `VelocityMarquee` có nút dừng, công cụ ước lượng | p95 khung hình dưới 25ms, CLS bằng 0 |
| P5 Nội dung thật và QA | Thay khung chờ bằng tài sản của Sophie, SEO, đo lường, chạy hết QA | Đạt checklist mục 9 |
| P6 Bàn giao | Gỡ kit, kiểm không còn import trỏ vào kit, deploy | Build sạch, domain chạy |

---

## 9. Kiểm tra (verification)

- `npm run build && npm start`, rồi chạy `tools/site-qa.mjs` với các trang `/`, `/cam-on` và `/chinh-sach-bao-mat`. Dùng một **bản chép** của tool trong `scripts/` của dự án, đã sửa `chromium.launch()` thành `chromium.launch(gpuLaunchOptions())` từ `/root/.local/lib/gpu-browser/gpu-browser.mjs` (theo CLAUDE.md). Tool kiểm lỗi console, tràn ngang, chữ bị ẩn, tương phản AA, giảm chuyển động và tắt JS.
- Chụp màn hình bằng Playwright ở 375, 768, 1280 và 1440px, rồi xem lại ảnh từng phần.
- Thử tay theo `references/qa-checklist.md`: cuộn nhanh, cuộn ngược qua cảnh ghim, đổi kích thước cửa sổ giữa cảnh, bật "giảm chuyển động", điều hướng bằng phím Tab.
- Form: gửi một lead thử và thấy dòng mới trong Sheet; tắt mạng thì thấy thông báo lỗi kèm nút Zalo; honeypot chặn được bot.
- Lighthouse cho điện thoại: LCP dưới 2.5s, CLS bằng 0. Kiểm JSON-LD bằng Rich Results Test.
- Đối chiếu mục 8 của playbook: không có số liệu, logo, lời chứng thực hay giá nào thiếu nguồn.
