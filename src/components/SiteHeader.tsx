"use client";

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

/** Sticky top nav: logo + wordmark, links, persistent orange Browse CTA. */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 border-b border-mute bg-canvas px-6 py-3">
      {/* On narrow screens the links drop to their own full-width row so they
          flow left, instead of being squeezed into a column beside the logo. */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-3">
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

        <div className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 sm:order-2 sm:w-auto sm:flex-1">
          {LINKS.map((l) => {
            const active = l.href.startsWith("/#")
              ? pathname === "/"
              : pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-nav text-ink hover:underline ${
                  active ? "font-semibold" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/#browse"
          className={`${BTN_PRIMARY} order-2 ml-auto sm:order-3 sm:ml-0`}
        >
          Browse books
        </Link>
      </div>
    </nav>
  );
}
