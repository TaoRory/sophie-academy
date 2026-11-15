"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Audience } from "@/content/types";

export interface Prefill {
  currentBand?: string;
  target?: string;
  deadline?: string;
}

interface Ctx {
  audience: Audience;
  setAudience: (a: Audience) => void;
  prefill: Prefill;
  setPrefill: (p: Prefill) => void;
}

const LeadCtx = createContext<Ctx | null>(null);

/** Trạng thái dùng chung giữa phần nỗi đau (tab), công cụ ước lượng và form. */
export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<Audience>("hoc-sinh");
  const [prefill, setPrefill] = useState<Prefill>({});
  const value = useMemo(() => ({ audience, setAudience, prefill, setPrefill }), [audience, prefill]);
  return <LeadCtx.Provider value={value}>{children}</LeadCtx.Provider>;
}

export function useLead() {
  const v = useContext(LeadCtx);
  if (!v) throw new Error("useLead cần <LeadProvider>");
  return v;
}
