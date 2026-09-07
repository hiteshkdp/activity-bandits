"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/config/site";
import { BTN_PRIMARY } from "@/components/ui";

const LINKS = [
  { label: "Books", href: "/#browse" },
  { label: "Reading books", href: "/#series" },
  { label: "Free fun", href: "/play" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Sticky top nav. On desktop it's the designed single row (logo · links ·
 * orange CTA). Below `sm` the five links don't fit, so they collapse into a
 * hamburger panel and the bar stays one row tall.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" : pathname === href;

  return (
    <nav className="sticky top-0 z-20 border-b border-mute bg-canvas px-6 py-3">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-cardsm font-bold text-ink hover:underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.logo}
            alt=""
            width={34}
            height={34}
            className="h-[34px] w-[34px] rounded-logo"
          />
          <span>{SITE.authorName}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden flex-1 flex-wrap items-center gap-x-5 gap-y-2 sm:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-nav text-ink hover:underline ${
                isActive(l.href) ? "font-semibold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA. Wrapped rather than given `hidden` directly, because
            BTN_PRIMARY already sets `inline-flex` and the two display
            utilities would fight (source order decides, not class order). */}
        <div className="hidden sm:block">
          <Link href="/#browse" className={BTN_PRIMARY}>
            Browse books
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto cursor-pointer rounded-img p-2 text-ink transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] hover:bg-canvas-soft sm:hidden"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="mt-3 flex flex-col gap-1 border-t border-mute pt-3 sm:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-img px-1 py-2.5 text-copy text-ink ${
                isActive(l.href) ? "font-semibold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#browse"
            onClick={() => setOpen(false)}
            className={`${BTN_PRIMARY} mt-2`}
          >
            Browse books
          </Link>
        </div>
      )}
    </nav>
  );
}
