import Link from "next/link";
import { SITE } from "@/config/site";
import { CATEGORIES } from "@/data/books";
import { SiteNav } from "@/components/SiteNav";

/** Placeholder "bandit mask" mark — swapped out once SITE.logo is set. */
function PlaceholderMark() {
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 items-center justify-center rounded-pill bg-primary text-white"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 9c0-1 1-2 3-2h14c2 0 3 1 3 2 0 1-.4 2-1.2 2.7C22 14 20 16 17 16c-2.2 0-3.6-1-4.4-2.2-.3-.5-.9-.5-1.2 0C10.6 15 9.2 16 7 16c-3 0-5-2-5.8-4.3C.4 11 0 10 2 9Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20">
      {/* Announcement bar (playful top strip) */}
      <div className="bg-accent text-center text-caption font-bold uppercase tracking-wide text-accent-ink">
        <div className="mx-auto max-w-[88rem] px-5 py-1.5">
          🚚 Ships from your local Amazon · Fun for ages 3–12 · New books added often
        </div>
      </div>
      <div className="relative mx-auto flex max-w-[88rem] items-center justify-between border-b border-hairline bg-canvas/90 px-5 py-3.5 backdrop-blur">
        <Link href="/" className="flex items-center gap-2.5">
          {SITE.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={SITE.logo}
              alt={SITE.authorName}
              className="h-11 w-11 rounded-lg object-cover shadow-sm"
            />
          ) : (
            <PlaceholderMark />
          )}
          <span className="font-display text-title-md font-bold text-ink">
            {SITE.authorName}
          </span>
        </Link>

        <SiteNav categories={CATEGORIES} />
      </div>
    </header>
  );
}
