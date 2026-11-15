"use client";

import { useRef } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { gsap, MQ, useGSAP } from "@/lib/motion";

/** Icon nét tự vẽ khi vào màn hình (như bút vẽ lên giấy). Không JS / giảm chuyển động: icon đầy đủ. */
export function DrawIcon({ name, size = 24, delay = 0 }: { name: IconName; size?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.anyMotion, () => {
        gsap.fromTo(el.querySelectorAll("path, rect, circle"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7, delay, ease: "power2.inOut", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className="draw-wait inline-flex">
      <Icon name={name} size={size} />
    </span>
  );
}
