import { Rise } from "@/components/motion/Rise";
import { DrawIcon } from "@/components/pen/DrawIcon";
import { noiQuy } from "@/content/noiQuy";

/** Nội quy học viên: 6 thẻ như tờ "Nội quy" của Sophie (thanh tiêu đề navy, chấm cam), dải slogan cam ở cuối. */
export function NoiQuy() {
  return (
    <section id="noi-quy" data-section="noi-quy" className="section">
      <div className="wrap">
        <p className="mx-auto max-w-[62ch] text-center text-lg text-[var(--muted)]">Để đảm bảo quá trình học tập hiệu quả và quyền lợi của tất cả học viên, học viên vui lòng thực hiện các quy định sau:</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {noiQuy.map((q, i) => (
            <Rise as="li" kind="pop" index={i % 3} key={q.title} className="card-lift overflow-hidden rounded-[var(--r-card)] border border-[var(--line)] bg-white">
              <h2 className="on-ink flex items-center gap-3 bg-[var(--ink)] px-5 py-3 text-white" style={{ fontSize: "1.25rem", lineHeight: 1.25 }}>
                <span className="text-[var(--brand)]">
                  <DrawIcon name={q.icon} size={22} delay={i * 0.05} />
                </span>
                {q.title}
              </h2>
              <ul className="grid gap-3 p-5">
                {q.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand)]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          ))}
        </ul>
        <p className="mt-10 rounded-[var(--r-card)] bg-[var(--brand)] px-6 py-4 text-center text-lg font-extrabold uppercase tracking-wide text-[var(--ink)]">Học nghiêm túc – Tiến bộ từng ngày – Chinh phục mục tiêu IELTS</p>
      </div>
    </section>
  );
}
