import { skillLabel } from "@/content/types";

/** Hình minh họa cho từng mốc lộ trình: HTML/CSS, không số liệu thành tích. */
const card = "rounded-[var(--r-card)] border border-[var(--line)] bg-white p-4 sm:p-5";
const tag = <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Minh họa</p>;

export const roadmapVisuals = [
  function Entry() {
    return (
      <div className={card}>
        {tag}
        <p className="mb-3 font-bold">Kiểm tra đầu vào</p>
        {Object.values(skillLabel).map((s) => (
          <div key={s} className="mb-2 flex items-center gap-3 text-sm">
            <span className="w-24 font-semibold">{s}</span>
            <span className="h-2 flex-1 rounded-full bg-[var(--paper)]" />
          </div>
        ))}
        <p className="mt-3 text-sm text-[var(--muted)]">Giáo viên đo từng kỹ năng, rồi hỏi về mục tiêu của bạn.</p>
      </div>
    );
  },
  function Plan() {
    return (
      <div className={card}>
        {tag}
        <p className="mb-3 font-bold">Lộ trình của bạn</p>
        <ol className="space-y-2 text-sm">
          {["Tháng 1: nền tảng và kỹ năng cần ưu tiên", "Tháng 2: luyện sâu, sửa bài đều đặn", "Tháng 3: luyện đề và rà lại điểm yếu"].map((t) => (
            <li key={t} className="rounded-[var(--r-inner)] bg-[var(--paper)] px-3 py-2">
              {t}
            </li>
          ))}
        </ol>
      </div>
    );
  },
  function Lesson() {
    return (
      <div className={card}>
        {tag}
        <p className="mb-2 font-bold">Writing Task 2</p>
        <p className="leading-relaxed">
          The number of cars <s className="decoration-2 decoration-[var(--brand-ink)]">have</s> <span className="font-bold text-[var(--brand-ink)]">has</span> increased.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">Giáo viên sửa ngay trong buổi, kèm lý do.</p>
        <p className="mt-4 rounded-[var(--r-inner)] bg-[var(--brand-soft)] px-3 py-2 text-sm font-semibold">Bài tập sau buổi: viết lại đoạn mở bài.</p>
      </div>
    );
  },
  function Monthly() {
    return (
      <div className={card}>
        {tag}
        <p className="mb-3 font-bold">Nhận xét cuối tháng</p>
        <ul className="space-y-2 text-sm">
          <li className="rounded-[var(--r-inner)] bg-[var(--paper)] px-3 py-2">Đã làm tốt: …</li>
          <li className="rounded-[var(--r-inner)] bg-[var(--paper)] px-3 py-2">Cần củng cố: …</li>
          <li className="rounded-[var(--r-inner)] bg-[var(--brand-soft)] px-3 py-2 font-semibold">Tháng sau tập trung vào: …</li>
        </ul>
      </div>
    );
  },
  function Exam() {
    return (
      <div className={card}>
        {tag}
        <p className="mb-3 font-bold">Những buổi cuối</p>
        <ul className="space-y-2 text-sm">
          <li className="rounded-[var(--r-inner)] bg-[var(--paper)] px-3 py-2">Luyện đề theo giờ thi</li>
          <li className="rounded-[var(--r-inner)] bg-[var(--paper)] px-3 py-2">Rà lại lỗi hay gặp</li>
          <li className="rounded-[var(--r-inner)] bg-[var(--paper)] px-3 py-2">Chốt kế hoạch trước ngày thi</li>
        </ul>
      </div>
    );
  },
] as const;
