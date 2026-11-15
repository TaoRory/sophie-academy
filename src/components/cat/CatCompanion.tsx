"use client";

import { useRef } from "react";
import { CAT_FEET_RATIO, CAT_VIEWBOX, CatRig, CENTER_X, GROUND, JOINT } from "@/components/cat/CatRig";
import { gsap, MQ, useGSAP } from "@/lib/motion";

/**
 * Mèo Sophie gốc đi theo người xem như mèo thật (spec: .claude/skills/sophie-section/sections/16-meo.md).
 *
 * Chuỗi trạng thái: sit → (đứng dậy) walk → edge (dừng ở mép, cúi nhìn, nhún) → jump (rơi có gia tốc) → land → walk tới chỗ ngồi → sit.
 * - Máy tính: chỗ đậu là khối có [data-cat-perch="left|right"], mèo đi trên mép trên của khối.
 * - Điện thoại: đậu ở hero, rồi xuống thanh CTA đáy [data-cat-perch-mobile]; sang phần mới thì thong thả đi sang đầu kia thanh.
 * - Rê chuột (máy tính) / chạm (điện thoại) khi đang ngồi: giơ tay vẫy, vẫy đuôi, bong bóng "Hello!".
 * - Giảm chuyển động / không JS: không chạy; Hero có mèo gốc ngồi tĩnh (.hero-cat-static).
 */

const HEADER = 64;
type Phase = "sit" | "walk" | "edge" | "jump" | "land";

export function CatCompanion() {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktopMotion, mobile: MQ.mobileMotion }, (ctx) => {
      const desktop = Boolean(ctx.conditions?.desktop);
      const root = document.documentElement;
      const svg = layer.querySelector<SVGSVGElement>("svg")!;
      const q = (n: string) => svg.querySelector<SVGGElement>(`[data-part="${n}"]`)!;
      const sit = q("sit"), walk = q("walk"), sitTail = q("sit-tail"), sitPaw = q("sit-paw");
      const head = q("walk-head"), tail = q("walk-tail"), bubble = q("bubble");
      const nf = q("leg-nf"), ff = q("leg-ff"), nb = q("leg-nb"), fb = q("leg-fb");
      const legs = [nf, ff, nb, fb];

      root.dataset.cat = "on";
      layer.dataset.mode = desktop ? "desktop" : "mobile";
      gsap.set(sitTail, { svgOrigin: JOINT.sitTail });
      gsap.set(sitPaw, { svgOrigin: JOINT.sitPaw });
      gsap.set(head, { svgOrigin: JOINT.walkHead });
      gsap.set(tail, { svgOrigin: JOINT.walkTail });
      gsap.set(nf, { svgOrigin: JOINT.legNF });
      gsap.set(ff, { svgOrigin: JOINT.legFF });
      gsap.set(nb, { svgOrigin: JOINT.legNB });
      gsap.set(fb, { svgOrigin: JOINT.legFB });
      gsap.set(walk, { svgOrigin: `${CENTER_X} ${GROUND}`, opacity: 0 });
      gsap.set(sit, { svgOrigin: `${CENTER_X} ${GROUND}` });
      gsap.set(bubble, { svgOrigin: "240 360", scale: 0, opacity: 1 });

      // ----- kích thước & neo (tâm chân) -----
      let catW = 0, catH = 0, anchorX = 0, anchorY = 0, EDGE = 0, REST = 0;
      const measure = () => {
        const r = svg.getBoundingClientRect();
        catW = r.width;
        catH = r.height;
        anchorX = ((CENTER_X - CAT_VIEWBOX.x) / CAT_VIEWBOX.w) * catW;
        anchorY = (1 - CAT_FEET_RATIO) * catH;
        EDGE = catW * 0.3; // chân trước sát mép khối
        REST = catW * 0.62; // chỗ ngồi cách góc
      };
      measure();
      const SPEED = desktop ? 115 : 80; // px/giây: đi thong thả

      // ----- chu kỳ bước chân (chạy khi đi, dừng khi đứng) -----
      const step = 0.34;
      const walkCycle = gsap
        .timeline({ paused: true, repeat: -1 })
        .fromTo([nf, fb], { rotation: -18 }, { rotation: 18, duration: step, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0)
        .fromTo([nb, ff], { rotation: 18 }, { rotation: -18, duration: step, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0)
        .fromTo(walk, { y: 0 }, { y: -3, duration: step / 2, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0)
        .fromTo(tail, { rotation: -6 }, { rotation: 6, duration: step, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0);

      // ----- trạng thái -----
      let perch: HTMLElement | null = null;
      let dest: HTMLElement | null = null;
      let u = 0; // vị trí tâm chân theo chiều ngang, tính từ mép trái khối đậu (px)
      let walkTo = 0;
      let speedMul = 1;
      let f = 1; // hướng mặt: 1 phải, -1 trái
      let phase: Phase = "sit";
      let pose: "sit" | "walk" = "sit";
      let pos = { x: -999, y: -999 };
      const jump = { t: 0, from: { x: 0, y: 0 }, landU: 0, T: 0.6, dy: 0 };
      let poseTl: gsap.core.Timeline | null = null;
      let waveTl: gsap.core.Timeline | null = null;
      let lastSection: string | null = null;

      const rectOf = (el: HTMLElement) => el.getBoundingClientRect();
      const sideOf = (el: HTMLElement) => (el.dataset.catPerch ?? el.dataset.catPerchMobile ?? el.dataset.catFloor) === "left" ? "left" : "right";
      // mép khối còn nhìn thấy được (không bị header che, chưa trôi khỏi đáy)
      const visible = (el: HTMLElement) => {
        const r = rectOf(el);
        return r.width > 0 && r.top >= HEADER + catH * 0.3 && r.top <= window.innerHeight - 2;
      };
      const restU = (el: HTMLElement, r = rectOf(el)) => (sideOf(el) === "left" ? Math.min(REST, r.width / 2) : Math.max(r.width - REST, r.width / 2));

      const setFacing = (dir: number) => {
        f = dir >= 0 ? 1 : -1;
        gsap.set(walk, { scaleX: f });
        gsap.set(sit, { scaleX: -f }); // mèo gốc ngồi quay sang trái: lật khi hướng phải
      };

      const toWalkPose = () => {
        if (pose === "walk") return;
        pose = "walk";
        waveTl?.progress(1);
        gsap.to(sit, { opacity: 0, duration: 0.12, ease: "none" });
        gsap.to(walk, { opacity: 1, duration: 0.12, ease: "none" });
      };

      const sitDown = () => {
        phase = "sit";
        walkCycle.pause();
        poseTl?.kill();
        poseTl = gsap
          .timeline()
          .to(legs, { rotation: 0, duration: 0.2, ease: "power2.out" })
          .to(walk, { y: 0, rotation: 0, duration: 0.2 }, 0)
          .add(() => {
            pose = "sit";
            gsap.set(sit, { scaleX: -f });
          })
          .to(walk, { opacity: 0, duration: 0.12, ease: "none" })
          .to(sit, { opacity: 1, duration: 0.12, ease: "none" }, "<")
          // ngồi xong: vẫy đuôi vài nhịp rồi yên (không lặp mãi)
          .to(sitTail, { rotation: 10, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 3 })
          .set(sitTail, { rotation: 0 });
      };

      const startWalk = (target: number) => {
        walkTo = target;
        const dist = Math.abs(walkTo - u);
        if (dist < 4) return false;
        setFacing(walkTo > u ? 1 : -1);
        speedMul = Math.max(1, dist / SPEED / 2.6); // đi thong thả, lâu nhất ~2.6s
        poseTl?.kill();
        toWalkPose();
        walkCycle.timeScale(speedMul).play();
        phase = "walk";
        return true;
      };

      const takeoff = () => {
        if (!dest) return sitDown();
        const rd = rectOf(dest);
        const vw = window.innerWidth, vh = window.innerHeight;
        jump.from = {
          x: gsap.utils.clamp(catW * 0.4, vw - catW * 0.4, pos.x),
          y: gsap.utils.clamp(HEADER + catH * 0.4, vh, pos.y < -500 ? vh : pos.y),
        };
        const landAbs = jump.from.x + f * catW * 0.5;
        jump.landU = gsap.utils.clamp(EDGE, Math.max(EDGE, rd.width - EDGE), landAbs - rd.left);
        jump.dy = rd.top - jump.from.y;
        const dx = rd.left + jump.landU - jump.from.x;
        if (Math.abs(dx) > 10) setFacing(dx);
        jump.T = gsap.utils.clamp(0.5, 0.95, 0.5 + Math.abs(jump.dy) / 1500 + Math.abs(dx) / 3000);
        jump.t = 0;
        phase = "jump";
        toWalkPose();
        walkCycle.pause();
        const falling = jump.dy > 0;
        poseTl?.kill();
        poseTl = gsap
          .timeline()
          // bật: chân sau đạp, chân trước vươn ra trước, thân duỗi
          .to([nf, ff], { rotation: -55, duration: 0.18, ease: "power2.out" }, 0)
          .to([nb, fb], { rotation: 48, duration: 0.18, ease: "power2.out" }, 0)
          .to(walk, { y: 0, rotation: falling ? -8 : -14, duration: 0.18, ease: "power2.out" }, 0)
          .to(tail, { rotation: -22, duration: 0.25 }, 0)
          .to(head, { rotation: 0, duration: 0.2 }, 0)
          // giữa không trung: chân trước hạ xuống đón đất, thân chúi theo hướng rơi
          .to([nf, ff], { rotation: 10, duration: jump.T * 0.45, ease: "power1.inOut" }, jump.T * 0.45)
          .to(walk, { rotation: falling ? 14 : 4, duration: jump.T * 0.5, ease: "power1.in" }, jump.T * 0.4);
        gsap.to(jump, { t: 1, duration: jump.T, ease: "none", onComplete: land });
      };

      const land = () => {
        if (dest) perch = dest;
        dest = null;
        u = jump.landU;
        phase = "land";
        poseTl?.kill();
        poseTl = gsap
          .timeline({
            onComplete: () => {
              if (!perch || perch === floor) return sitDown(); // sàn: ngồi ngay chỗ tiếp đất
              // đi tới chỗ ngồi, nhưng không quá ~300px (mèo không băng qua cả màn hình)
              const target = restU(perch);
              if (!startWalk(u + gsap.utils.clamp(-300, 300, target - u))) sitDown();
            },
          })
          // chân trước chạm đất trước, thân nén lại rồi đứng thẳng
          .to(walk, { rotation: 0, y: 7, duration: 0.12, ease: "power2.out" }, 0)
          .to(legs, { rotation: 0, duration: 0.14, ease: "power2.out" }, 0)
          .to(tail, { rotation: 0, duration: 0.3 }, 0)
          .to(walk, { y: 0, duration: 0.28, ease: "power3.out" }, 0.12);
      };

      const toEdge = (up = false) => {
        phase = "edge";
        walkCycle.pause();
        poseTl?.kill();
        poseTl = gsap
          .timeline({ onComplete: takeoff })
          .to(legs, { rotation: 0, duration: 0.15, ease: "power2.out" })
          .to(walk, { y: 0, duration: 0.15 }, 0)
          // dừng lại ngắm chỗ sẽ nhảy: cúi nhìn xuống (nhảy xuống) hoặc ngước lên (nhảy lên)
          .to(head, { rotation: up ? -14 : 16, duration: 0.3, ease: "power2.inOut" })
          .to({}, { duration: 0.25 })
          // nhún: thân hạ, chân sau gập
          .to(walk, { y: 8, duration: 0.18, ease: "power2.in" })
          .to([nb, fb], { rotation: -14, duration: 0.18, ease: "power2.in" }, "<")
          .to(head, { rotation: up ? -8 : 6, duration: 0.18 }, "<");
      };

      const startJourney = (to: HTMLElement) => {
        dest = to;
        const r = perch ? rectOf(perch) : null;
        // khối đang đứng đã trôi khỏi tầm nhìn: bỏ đoạn đi, nhảy luôn từ mép khung nhìn
        if (!perch || !r || !visible(perch)) {
          waveTl?.progress(1);
          return takeoff();
        }
        const rd = rectOf(to);
        waveTl?.progress(1);
        // khối đích cao hơn (hoặc đang ở sàn): mèo bật lên tại chỗ, không cần ra mép
        if (rd.top < r.top - 12 || perch === floor) {
          const dx = rd.left + restU(to, rd) - (r.left + u);
          if (Math.abs(dx) > 10) setFacing(dx);
          toWalkPose();
          return toEdge(true);
        }
        // khối đích thấp hơn: đi thong thả ra mép gần nhất rồi mới nhảy xuống
        const edgeU = u < r.width / 2 ? EDGE : r.width - EDGE;
        if (!startWalk(edgeU)) toEdge();
      };

      // ----- vẫy chào -----
      const wave = () => {
        if (phase !== "sit" || pose !== "sit" || waveTl?.isActive()) return;
        poseTl?.progress(1);
        waveTl = gsap
          .timeline({ onComplete: () => void gsap.set([sitPaw, sitTail], { rotation: 0 }) })
          .to(sitPaw, { rotation: 128, duration: 0.3, ease: "power3.out" })
          .to(bubble, { scale: 1, duration: 0.3, ease: "power3.out" }, 0.05)
          .to(sitPaw, { rotation: 108, duration: 0.17, ease: "sine.inOut", yoyo: true, repeat: 5 }, 0.3)
          .to(sitTail, { rotation: 16, duration: 0.14, ease: "sine.inOut", yoyo: true, repeat: 7 }, 0.1)
          .to(bubble, { scale: 0, duration: 0.25, ease: "power3.in" }, 1.45)
          .to(sitPaw, { rotation: 0, duration: 0.35, ease: "power3.inOut" }, 1.4);
      };
      const onEnter = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && window.matchMedia(MQ.fineHover).matches) wave();
      };
      svg.addEventListener("pointerenter", onEnter);
      svg.addEventListener("pointerdown", wave);

      // ----- chọn chỗ đậu -----
      let perchList = desktop ? [...document.querySelectorAll<HTMLElement>("[data-cat-perch]")] : [];
      const heroPerch = document.querySelector<HTMLElement>('[data-section="hero"] [data-cat-perch]');
      const floor = layer.parentElement?.querySelector<HTMLElement>("[data-cat-floor]") ?? null;
      const barPerch = document.querySelector<HTMLElement>("[data-cat-perch-mobile]");

      const validTop = (top: number, vh: number) => top >= HEADER + catH * 0.6 && top <= vh * 0.85;
      let noPerchSince = 0;
      const pickDesktop = (vh: number) => {
        let best: HTMLElement | null = null;
        let bestD = Infinity;
        let curD = Infinity;
        for (const el of perchList) {
          const r = rectOf(el);
          if (!r.width || !r.height || !validTop(r.top, vh)) continue;
          const d = Math.abs(r.top - vh * 0.4);
          if (el === perch) curD = d;
          if (d < bestD) {
            bestD = d;
            best = el;
          }
        }
        // chỗ đang đậu còn hợp lệ thì chỉ đổi khi chỗ mới tốt hơn hẳn (tránh nhảy qua lại liên tục)
        if (curD !== Infinity && best !== perch && bestD > curD - 160) return perch;
        if (best) {
          noPerchSince = 0;
          return best;
        }
        // không mép khối nào ở vùng đẹp: ở lại nếu chỗ đang đứng còn thấy, không thì xuống "sàn" đáy màn hình chờ
        if (perch && perch !== floor && visible(perch)) return perch;
        // chỉ xuống sàn khi đã không có chỗ nào trong ~0.45s (tránh nhảy xuống rồi lên ngay)
        const now = performance.now();
        if (!noPerchSince) noPerchSince = now;
        return now - noPerchSince > 450 ? floor : perch;
      };
      const pickMobile = (vh: number) => {
        if (heroPerch) {
          const r = rectOf(heroPerch);
          if (r.top > HEADER + catH * 0.4 && r.top < vh * 0.9) return heroPerch;
        }
        if (barPerch && rectOf(barPerch).top < vh - 8) return barPerch;
        return perch;
      };
      const sectionAtMiddle = (vh: number) =>
        document.elementFromPoint(window.innerWidth / 2, vh / 2)?.closest<HTMLElement>("[data-section]")?.dataset.section ?? null;

      // ----- vòng lặp khung hình -----
      let last = performance.now();
      const tick = () => {
        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const vh = window.innerHeight;
        const want = desktop ? pickDesktop(vh) : pickMobile(vh);

        if (!perch && want && phase === "sit") {
          perch = want; // lần đầu: ngồi sẵn
          u = restU(want);
          setFacing(sideOf(want) === "left" ? 1 : -1);
        } else if (want && want !== perch && want !== dest && (phase === "sit" || phase === "walk" || phase === "edge")) {
          startJourney(want);
        } else if (!desktop && barPerch && perch === barPerch && phase === "sit") {
          // điện thoại: sang phần mới thì thong thả đi sang đầu kia thanh
          const sec = sectionAtMiddle(vh);
          if (sec && lastSection && sec !== lastSection) {
            const w = rectOf(barPerch).width;
            startWalk(u > w / 2 ? REST : w - REST);
          }
          lastSection = sec;
        }

        if ((phase === "walk" || phase === "edge") && dest && perch && !visible(perch)) {
          poseTl?.kill();
          takeoff();
        }

        if (phase === "walk") {
          const stepPx = SPEED * speedMul * dt;
          u += Math.sign(walkTo - u) * Math.min(stepPx, Math.abs(walkTo - u));
          if (Math.abs(walkTo - u) < 0.5) {
            if (dest) toEdge();
            else sitDown();
          }
        }

        if (phase === "jump" && dest) {
          const rd = rectOf(dest);
          const t = jump.t;
          const tx = rd.left + jump.landU;
          const dy = rd.top - jump.from.y;
          const hop = 4 * t * (1 - t);
          pos = {
            x: jump.from.x + (tx - jump.from.x) * t,
            // rơi: chậm lúc đầu, nhanh dần (trọng lực); nhảy lên: nhanh lúc đầu, chậm dần
            y: dy > 0 ? jump.from.y + dy * t * t - 28 * hop : jump.from.y + dy * (1 - (1 - t) * (1 - t)) - 36 * hop,
          };
          pos.y = Math.max(pos.y, HEADER + catH * 0.5);
        } else if (perch) {
          const r = rectOf(perch);
          pos = { x: r.left + u, y: r.top };
        }

        layer.style.transform = `translate3d(${(pos.x - anchorX).toFixed(1)}px, ${(pos.y - anchorY).toFixed(1)}px, 0)`;
        layer.style.visibility = perch || phase === "jump" ? "visible" : "hidden";
        if (layer.dataset.phase !== phase) layer.dataset.phase = phase;
      };

      const onResize = () => {
        measure();
        if (desktop) perchList = [...document.querySelectorAll<HTMLElement>("[data-cat-perch]")];
      };
      window.addEventListener("resize", onResize);
      // đăng ký sau Lenis để đọc vị trí sau khi trang đã cuộn trong khung này
      const raf = requestAnimationFrame(() => gsap.ticker.add(tick));

      return () => {
        cancelAnimationFrame(raf);
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", onResize);
        svg.removeEventListener("pointerenter", onEnter);
        svg.removeEventListener("pointerdown", wave);
        walkCycle.kill();
        poseTl?.kill();
        waveTl?.kill();
        gsap.killTweensOf(jump);
        delete root.dataset.cat;
        layer.style.visibility = "hidden";
      };
    });

    return () => mm.revert();
  });

  return (
    <>
      {/* "Sàn" ảo ở đáy màn hình: mèo xuống đây ngồi chờ khi không có mép khối nào trong tầm nhìn */}
      <div data-cat-floor="left" className="cat-floor" aria-hidden="true" />
      <div ref={layerRef} className="cat-companion" aria-hidden="true">
        <CatRig size={120} />
      </div>
    </>
  );
}
