"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLead } from "@/components/LeadContext";
import { ZaloLink } from "@/components/ui/ZaloLink";
import { bands, deadlines, targets } from "@/content/estimatorRules";
import { site } from "@/content/site";
import { type Audience, audienceLabel } from "@/content/types";
import { leadSchema } from "@/lib/lead";

const audiences: Audience[] = ["hoc-sinh", "sinh-vien", "di-lam"];
const field = "min-h-12 w-full rounded-[var(--r-inner)] border-2 border-[var(--ink)] bg-white px-4 text-[var(--ink)]";
const label = "mb-1.5 block font-bold";

export function LeadForm() {
  const router = useRouter();
  const { audience, setAudience, prefill } = useLead();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]) {
      const v = q.get(k);
      if (v) utm[k] = v.slice(0, 200);
    }
    const raw = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      audience: fd.get("audience"),
      contactWho: fd.get("contactWho") ?? "",
      currentBand: fd.get("currentBand") || undefined,
      target: fd.get("target") || undefined,
      deadline: fd.get("deadline") || undefined,
      slots: fd.get("slots") || undefined,
      note: fd.get("note") || undefined,
      consent: fd.get("consent") === "on",
      website: fd.get("website") || undefined,
      utm,
      source: window.location.href.slice(0, 300),
    };
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      setStatus("idle");
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/cam-on");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: string) => (errors[k] ? <p id={`err-${k}`} role="alert" className="mt-1.5 font-semibold text-[var(--ink)]">{errors[k]}</p> : null);
  const inv = (k: string) => ({ "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div>
        <label className={label} htmlFor="lf-name">Họ tên</label>
        <div className="field-pen"><input id="lf-name" name="name" autoComplete="name" className={field} {...inv("name")} /></div>
        {err("name")}
      </div>
      <div>
        <label className={label} htmlFor="lf-phone">Số điện thoại / Zalo</label>
        <div className="field-pen"><input id="lf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} {...inv("phone")} /></div>
        {err("phone")}
      </div>
      <fieldset>
        <legend className={label}>Bạn là</legend>
        <div className="flex flex-wrap gap-2">
          {audiences.map((a) => (
            <label key={a} className="cursor-pointer">
              <input type="radio" name="audience" value={a} className="peer sr-only" checked={audience === a} onChange={() => setAudience(a)} />
              <span className="inline-flex min-h-11 items-center rounded-full border-2 border-[var(--ink)] bg-white px-4 font-semibold peer-checked:bg-[var(--ink)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ink)]">
                {audienceLabel[a]}
              </span>
            </label>
          ))}
        </div>
        {err("audience")}
      </fieldset>
      {audience === "hoc-sinh" && (
        <fieldset>
          <legend className={label}>Người để Sophie liên hệ</legend>
          <div className="flex gap-4">
            {([["phu-huynh", "Phụ huynh"], ["hoc-sinh", "Học sinh"]] as const).map(([v, l]) => (
              <label key={v} className="flex items-center gap-2 font-semibold">
                <input type="radio" name="contactWho" value={v} defaultChecked={v === "phu-huynh"} /> {l}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="grid gap-5 sm:grid-cols-3">
        {([["currentBand", "Band hiện tại", bands, prefill.currentBand], ["target", "Mục tiêu", targets, prefill.target], ["deadline", "Hạn thi", deadlines, prefill.deadline]] as const).map(([name, text, opts, pre]) => (
          <div key={name + (pre ?? "")}>
            <label className={label} htmlFor={`lf-${name}`}>{text}</label>
            <select id={`lf-${name}`} name={name} defaultValue={pre ?? ""} className={field}>
              <option value="">Chưa chọn</option>
              {opts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div>
        <label className={label} htmlFor="lf-slots">Khung giờ bạn thường rảnh</label>
        <div className="field-pen"><input id="lf-slots" name="slots" placeholder="Ví dụ: tối thứ 2, 4, 6" className={field} /></div>
      </div>
      <div>
        <label className={label} htmlFor="lf-note">Ghi chú thêm (không bắt buộc)</label>
        <textarea id="lf-note" name="note" rows={3} className={`${field} py-3`} />
      </div>
      {/* Honeypot: người thật không thấy và không điền */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label className="flex items-start gap-3 font-semibold">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0" {...inv("consent")} />
          <span>Mình đồng ý để Sophie liên hệ theo <a href="/chinh-sach-bao-mat" className="underline underline-offset-4" target="_blank">chính sách bảo mật</a>.</span>
        </label>
        {err("consent")}
      </div>
      <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full sm:w-auto">
        {status === "sending" ? "Đang gửi…" : "Gửi thông tin"}
      </button>
      {status === "error" && (
        <p role="alert" className="rounded-[var(--r-inner)] bg-white p-4 font-semibold">
          Chưa gửi được thông tin của bạn. Bạn thử lại sau ít phút
          {site.zaloUrl ? (
            <>
              {" "}hoặc <ZaloLink className="underline underline-offset-4">nhắn Sophie qua Zalo</ZaloLink>
            </>
          ) : null}
          .
        </p>
      )}
    </form>
  );
}
