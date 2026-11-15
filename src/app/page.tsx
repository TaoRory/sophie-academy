import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// P0: khung trang. Các phần thật được dựng ở P1 theo skill sophie-section.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero" data-section="hero" className="section wrap" style={{ minHeight: "70svh" }}>
          <h1>IELTS 1 kèm 1 online. Giáo viên 8.0 dạy riêng bạn.</h1>
          <p className="mt-6 max-w-[60ch]">Khung trang P0: nội dung các phần sẽ được dựng ở P1.</p>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
