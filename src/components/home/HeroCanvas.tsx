"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative "laser beams" effect behind the hero: soft blue vertical strips
 * that breathe, plus rising sparks and a glow along the baseline.
 *
 * Sits absolutely inside a `position: relative` parent with the hero content in
 * a `z-index: 1` wrapper above it. Purely decorative and pointer-transparent.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let raf = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let observer: ResizeObserver | undefined;
    let onResize: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      const canvas = ref.current;
      // The canvas may not be mounted on the first tick — keep trying.
      if (!canvas) {
        retry = setTimeout(start, 120);
        return;
      }
      const parent = canvas.parentElement;
      const ctx = canvas.getContext("2d");
      if (!parent || !ctx) return;

      const BLUE = "77, 163, 255";
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = 0;
      let h = 0;
      let beams: {
        x: number;
        width: number;
        max: number;
        phase: number;
        speed: number;
      }[] = [];
      let sparks: {
        x: number;
        y: number;
        r: number;
        vy: number;
        alpha: number;
      }[] = [];

      const resize = () => {
        const r = parent.getBoundingClientRect();
        w = r.width;
        h = r.height;
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.max(10, Math.round(w / 46));
        beams = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          width: 0.5 + Math.random() * 1.1,
          max: 0.18 + Math.random() * 0.42,
          phase: Math.random() * Math.PI * 2,
          speed: 0.18 + Math.random() * 0.42,
        }));
        sparks = Array.from({ length: 18 }, () => ({
          x: Math.random() * w,
          y: h - Math.random() * h * 0.8,
          r: 0.6 + Math.random() * 1.4,
          vy: 6 + Math.random() * 22,
          alpha: 0.08 + Math.random() * 0.2,
        }));
      };

      let last = performance.now();
      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        ctx.clearRect(0, 0, w, h);

        const baseY = h - 2;

        for (const b of beams) {
          b.phase += dt * b.speed;
          const life = (Math.sin(b.phase) + 1) / 2;
          const top = baseY - h * b.max * (0.35 + life * 0.65);
          const g = ctx.createLinearGradient(0, baseY, 0, top);
          g.addColorStop(0, `rgba(${BLUE}, ${(0.2 * life + 0.03).toFixed(3)})`);
          g.addColorStop(1, `rgba(${BLUE}, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(b.x, top, b.width, baseY - top);
        }

        for (const s of sparks) {
          s.y -= s.vy * dt;
          if (s.y < h * 0.1) {
            s.y = baseY;
            s.x = Math.random() * w;
          }
          ctx.fillStyle = `rgba(${BLUE}, ${(s.alpha * (s.y / baseY)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }

        const glow = ctx.createLinearGradient(0, baseY - 90, 0, baseY + 4);
        glow.addColorStop(0, `rgba(${BLUE}, 0)`);
        glow.addColorStop(1, `rgba(${BLUE}, 0.16)`);
        ctx.fillStyle = glow;
        ctx.fillRect(0, baseY - 90, w, 94);

        ctx.fillStyle = "rgba(170, 210, 255, 0.65)";
        ctx.fillRect(0, baseY, w, 1);

        if (!cancelled) raf = requestAnimationFrame(frame);
      };

      resize();
      onResize = () => resize();
      window.addEventListener("resize", onResize);
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => resize());
        observer.observe(parent);
      }
      raf = requestAnimationFrame(frame);
    };

    start();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (retry) clearTimeout(retry);
      if (observer) observer.disconnect();
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
