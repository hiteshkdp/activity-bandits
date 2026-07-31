import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Stuff — Coming Soon",
  description: `Free printable activities from ${SITE.authorName} — coming soon.`,
};

/** Simple 4-point sparkle used to dress up the illustration. */
function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden>
      <path d="M12 2c.5 6 3.5 9.5 10 10-6.5.5-9.5 4-10 10-.5-6-3.5-9.5-10-10 6.5-.5 9.5-4 10-10Z" />
    </svg>
  );
}

export default function FreeStuffPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="flex max-w-[40rem] flex-col items-center text-center">
          {/* Illustration: mascot art + sparkles */}
          <div className="relative">
            <Sparkle className="absolute -left-6 -top-4 h-7 w-7 text-accent" />
            <Sparkle className="absolute -right-7 top-6 h-9 w-9 text-primary" />
            <Sparkle className="absolute -bottom-3 -left-8 h-6 w-6 text-primary/70" />
            <Sparkle className="absolute -bottom-5 right-2 h-5 w-5 text-accent" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.logo}
              alt={SITE.authorName}
              className="h-44 w-44 rounded-2xl object-cover shadow-lg sm:h-52 sm:w-52"
            />
          </div>

          <span className="mt-8 inline-block rounded-pill bg-primary/15 px-4 py-1.5 text-caption font-bold uppercase tracking-wide text-primary">
            Coming soon
          </span>

          <h1 className="mt-4 text-display-sm font-semibold text-ink sm:text-display-md">
            Free stuff is on the way!
          </h1>

          <p className="mx-auto mt-4 max-w-[32rem] text-body-md leading-relaxed text-body sm:text-title-sm">
            We&apos;re putting together free printable mazes, word searches, colouring
            pages and puzzles for you to download and print at home. Check back soon!
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-primary px-7 py-3 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
          >
            Browse the books
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
