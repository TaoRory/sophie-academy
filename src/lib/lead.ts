import { z } from "zod";

const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s.\-()]/g, ""))
  .refine((v) => /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/.test(v), "Số điện thoại chưa đúng (ví dụ 0912 345 678)");

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Bạn nhập họ tên giúp Sophie nhé").max(80),
  phone,
  audience: z.enum(["hoc-sinh", "sinh-vien", "di-lam"], { error: "Bạn chọn nhóm của mình nhé" }),
  contactWho: z.enum(["phu-huynh", "hoc-sinh", ""]).optional(),
  currentBand: z.string().max(40).optional(),
  target: z.string().max(40).optional(),
  deadline: z.string().max(40).optional(),
  slots: z.string().max(200).optional(),
  note: z.string().max(1000).optional(),
  consent: z.literal(true, { error: "Bạn đồng ý chính sách bảo mật để Sophie liên hệ nhé" }),
  website: z.string().max(0).optional(), // honeypot: người thật để trống
  utm: z.record(z.string(), z.string().max(200)).optional(),
  source: z.string().max(300).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadPayload = z.output<typeof leadSchema>;
