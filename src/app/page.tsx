import { BOOKS, CATEGORIES, AUTHORS } from "@/data/books";
import { BookBrowser } from "@/components/BookBrowser";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { TopSellers } from "@/components/TopSellers";
import { AuthorRow } from "@/components/AuthorRow";
import { ValueProps } from "@/components/ValueProps";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Real social-proof figures computed from the catalogue.
const RATED = BOOKS.filter((b) => typeof b.rating === "number");
const AVG_RATING = RATED.length
  ? (RATED.reduce((s, b) => s + (b.rating ?? 0), 0) / RATED.length).toFixed(1)
  : null;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const { theme } = await searchParams;
  // Only honor a theme that actually exists in the catalogue.
  const activeCategory =
    theme && CATEGORIES.includes(theme) ? theme : null;

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-hairline bg-canvas">
        <h1 className="sr-only">
          Activity Bandits — fun activity books for curious kids, ages 3–12
        </h1>
        {/* Full-width brand banner */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-banner.jpg"
          alt="Activity Bandits — fun for curious kids"
          className="block w-full"
        />
        {/* CTA + trust badges */}
        <div className="mx-auto flex max-w-[88rem] flex-col items-center gap-4 px-5 py-6 text-center">
          <a
            href="#browse"
            className="inline-block rounded-pill bg-primary px-7 py-3 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
          >
            Browse all {BOOKS.length} books
          </a>
          <div className="flex flex-wrap justify-center gap-2.5">
            {AVG_RATING && (
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-soft px-3 py-1.5 text-body-sm font-bold text-ink">
                <span className="text-accent">★</span> {AVG_RATING} average
              </span>
            )}
            <span className="rounded-pill bg-surface-soft px-3 py-1.5 text-body-sm font-bold text-ink">
              {BOOKS.length} books
            </span>
            <span className="rounded-pill bg-surface-soft px-3 py-1.5 text-body-sm font-bold text-ink">
              Ships from your local Amazon
            </span>
            <span className="rounded-pill bg-surface-soft px-3 py-1.5 text-body-sm font-bold text-ink">
              Ages 3–12
            </span>
          </div>
        </div>
      </section>

      {/* Why kids love us */}
      <ValueProps />

      {/* Social proof + featured */}
      {!activeCategory && (
        <>
          <ReviewsStrip />
          <TopSellers />
          <AuthorRow
            author="Harry Kicker"
            heading="Harry Kicker — Football Story Series"
            subtitle="A read-along football adventure series for ages 5–7 — teamwork, courage and honesty, one match at a time."
            anchor="reading-books"
          />
        </>
      )}

      {/* Browse */}
      <main id="browse" className="mx-auto w-full max-w-[88rem] flex-1 px-5 py-12">
        <BookBrowser
          key={activeCategory ?? "all"}
          books={BOOKS}
          activeCategory={activeCategory}
          authors={AUTHORS}
        />
      </main>

      <SiteFooter />
    </>
  );
}
