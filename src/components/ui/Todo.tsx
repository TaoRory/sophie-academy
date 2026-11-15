/** Khung chờ dữ liệu thật từ Sophie. Không điền dữ liệu giả. */
export function Todo({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-todo="sophie" className={`rounded-[var(--r-card)] border-2 border-dashed border-[var(--line)] p-6 text-[var(--muted)] ${className ?? ""}`}>
      {children}
    </div>
  );
}
