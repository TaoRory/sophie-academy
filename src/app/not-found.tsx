import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="section wrap" style={{ minHeight: "60svh" }}>
        <h1>Trang này đi lạc rồi.</h1>
        <p className="mt-6 max-w-[50ch]">Đường dẫn bạn mở không tồn tại. Quay về trang chủ để xem lộ trình học IELTS 1 kèm 1 của Sophie.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Về trang chủ
        </Link>
      </main>
    </>
  );
}
