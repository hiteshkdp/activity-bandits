import type { ReactNode } from "react";

/**
 * Shared design-system primitives.
 *
 * Buttons are exported as class strings (not components) so the same styling
 * works on <a>, <Link> and <button> without wrapper churn. Every interactive
 * surface uses the 140ms transition from the design spec. No shadows anywhere —
 * elevation comes from surface contrast.
 */

const BTN_BASE =
  "inline-flex items-center justify-center rounded-ui px-6 py-3 text-btn font-semibold transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease]";

/** Orange — every primary call to action. */
export const BTN_PRIMARY = `${BTN_BASE} bg-primary text-on-primary hover:bg-primary-hover`;

/** Ink — secondary action on light surfaces (e.g. contact form submit). */
export const BTN_DARK = `${BTN_BASE} bg-ink text-on-primary hover:bg-ink-soft`;

/** Outline — inverts to ink on hover. */
export const BTN_OUTLINE = `${BTN_BASE} border border-ink bg-canvas text-ink hover:bg-ink hover:text-on-primary`;

/** Outline for use on an ink band (cream border, ink fill). */
export const BTN_OUTLINE_ON_INK = `${BTN_BASE} border border-canvas-soft bg-ink text-on-primary hover:bg-ink-soft`;

/** Cover image box — fixed height, contained, never cropped, no fill. */
export const COVER_BOX =
  "w-full h-[280px] object-contain object-center rounded-img";

/** Blue section eyebrow pill. Sits above every section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="w-fit rounded-pill bg-accent-blue px-4 py-[9px] text-eyebrow font-semibold uppercase text-white">
      {children}
    </p>
  );
}

/** Cream badge pill — "Ages 3–12", "Paperback", "Coming soon". */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-pill bg-canvas-soft px-3 py-1 text-nav text-ink">
      {children}
    </span>
  );
}

/** Uppercase small label — "BOOK 1", footer column heads. */
export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-label font-medium uppercase text-body-mid ${className}`}
    >
      {children}
    </span>
  );
}

/** A full-bleed page band with the 1280px inner container and 64px padding. */
export function Band({
  children,
  id,
  tone = "canvas",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "canvas" | "soft" | "ink" | "white";
  className?: string;
}) {
  const tones = {
    canvas: "bg-canvas text-ink",
    soft: "bg-canvas-soft text-ink",
    ink: "bg-ink text-on-primary",
    white: "bg-hero-white text-ink",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} px-6 py-16 ${className}`}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}
