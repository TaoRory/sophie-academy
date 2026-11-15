export type Audience = "hoc-sinh" | "sinh-vien" | "di-lam";

export const audienceLabel: Record<Audience, string> = {
  "hoc-sinh": "Học sinh",
  "sinh-vien": "Sinh viên",
  "di-lam": "Người đi làm",
};

export type Skill = "listening" | "reading" | "writing" | "speaking";
export const skillLabel: Record<Skill, string> = {
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
};

export interface Teacher {
  slug: string;
  name: string;
  photo: string; // public/teachers/*.webp
  band: string; // "8.0"
  strengths: string[];
  experience: string;
  quote?: string;
  featured?: boolean;
  certificate?: string;
}

export interface Result {
  name: string; // tên viết tắt: "Minh A."
  audience: Audience;
  before: string;
  after: string;
  months: number;
  quote?: string;
  scoreImage?: string; // đã che thông tin cá nhân
  consent: boolean; // chỉ render khi true
  featured?: boolean;
  showInStrip?: boolean;
}

export interface Testimonial {
  name: string;
  role: "Phụ huynh" | "Học sinh" | "Sinh viên" | "Người đi làm";
  quote?: string;
  screenshot?: string;
  consent: boolean;
}
