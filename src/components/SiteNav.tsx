"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, themeHref } from "@/config/nav";

/** Responsive top nav: Books▾ themes dropdown + extra links. */
export function SiteNav({ categories }: { categories: string[] }) {
  const [booksOpen, setBooksOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex items-center">
      {/* Desktop */}
      <ul className="hidden items-center gap-1 sm:flex">
        <li className="relative">
          <button
            onClick={() => setBooksOpen((v) => !v)}
            onBlur={() => setTimeout(() => setBooksOpen(false), 150)}
            className="flex items-center gap-1 rounded-pill px-3.5 py-2 text-button font-bold text-ink hover:bg-surface-soft"
            aria-expanded={booksOpen}
          >
            Books
            <Chevron open={booksOpen} />
          </button>
          {booksOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 w-[22rem] rounded-xl border border-hairline bg-surface p-2 shadow-xl">
              <Link
                href="/#browse"
                className="block rounded-md px-3 py-2 text-button font-bold text-primary hover:bg-surface-soft"
              >
                All books →
              </Link>
              <div className="my-1 h-px bg-hairline" />
              <div className="grid grid-cols-2 gap-0.5">
                {categories.map((c) => (
                  <Link
                    key={c}
                    href={themeHref(c)}
                    className="rounded-md px-3 py-1.5 text-body-sm font-semibold text-body hover:bg-surface-soft hover:text-ink"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="rounded-pill px-3.5 py-2 text-button font-bold text-ink hover:bg-surface-soft"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className="rounded-md p-2 text-ink sm:hidden"
        aria-label="Menu"
        aria-expanded={mobileOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          {mobileOpen ? (
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

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-30 max-h-[75vh] overflow-y-auto border-b border-hairline bg-surface px-5 py-4 shadow-xl sm:hidden">
          <Link
            href="/#browse"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-title-sm font-bold text-primary"
          >
            All books
          </Link>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-title-sm font-bold text-ink"
            >
              {l.label}
            </Link>
          ))}
          <p className="mt-3 mb-1 text-caption font-bold uppercase tracking-wide text-muted">
            Browse by theme
          </p>
          <div className="grid grid-cols-2 gap-x-3">
            {categories.map((c) => (
              <Link
                key={c}
                href={themeHref(c)}
                onClick={() => setMobileOpen(false)}
                className="block py-1.5 text-body-md font-semibold text-body"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
