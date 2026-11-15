import { Rise } from "@/components/motion/Rise";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roadmapSteps } from "@/content/roadmap";

/** Hành trình 5 bước: hàng thẻ có số, nối bằng một đường kẻ (máy tính); điện thoại xếp dọc. */
export function Journey() {
  return (
    <section id="lo-trinh" data-section="lo-trinh" className="section bg-[var(--paper)]">
      <div className="wrap">
        <SectionHeading before="Hành trình" accent="cùng Sophie" sub="Từ buổi kiểm tra đầu vào tới ngày đi thi, mỗi bước đều có giáo viên đi cùng." />
        <ol className="relative mt-12 grid gap-4 lg:grid-cols-5">
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-[2px] bg-[var(--line)] lg:block" />
          {roadmapSteps.map((s, i) => (
            <Rise as="li" kind="pop" index={i} key={s.title} className="relative rounded-[var(--r-card)] border border-[var(--line)] bg-white p-5 lg:pt-0 lg:text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--ink)] text-xl font-extrabold text-white lg:mx-auto lg:-mt-0 lg:translate-y-0" style={{ fontFamily: "var(--font-display)" }}>
                {i + 1}
              </span>
              <h3 className="mt-3 text-xl leading-tight">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-[var(--muted)]">{s.body}</p>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
