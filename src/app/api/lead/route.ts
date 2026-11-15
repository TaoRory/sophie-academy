import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";

// Giới hạn tần suất theo IP trong bộ nhớ: chỉ là lớp chắn cơ bản (mỗi instance serverless có bộ đếm riêng).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: bot điền ô ẩn. Trả 200 nhưng không ghi gì để bot không biết đã bị chặn.
  if (typeof (body as { website?: unknown })?.website === "string" && (body as { website: string }).website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret) {
    // Chưa cấu hình nơi nhận lead: báo lỗi thật, không giả lập thành công.
    console.error("[lead] thiếu LEAD_WEBHOOK_URL hoặc LEAD_WEBHOOK_SECRET");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const { website: _drop, ...lead } = parsed.data;
    void _drop;
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, receivedAt: new Date().toISOString(), ...lead }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !data?.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] gửi webhook lỗi:", e);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
