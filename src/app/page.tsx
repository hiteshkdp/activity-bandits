import { BOOKS, CATEGORIES, AUTHORS } from "@/data/books";
import { BookBrowser } from "@/components/BookBrowser";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { TopSellers } from "@/components/TopSellers";
import { AuthorRow } from "@/components/AuthorRow";
import { ValueProps } from "@/components/ValueProps";
import { HeroCovers } from "@/components/HeroCovers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

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
      <section className="overflow-hidden border-b border-hairline bg-primary/10">
        <div className="mx-auto grid max-w-[88rem] items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2">
          {/* Left: copy + trust + CTA */}
          <div className="text-center lg:text-left">
            <span className="text-caption font-bold uppercase tracking-[0.14em] text-primary">
              Activity books for kids
            </span>
            <h1 className="mt-4 text-display-md font-semibold text-ink sm:text-display-lg">
              Books that keep curious kids busy.
            </h1>
            <p className="mx-auto mt-4 max-w-[34rem] text-body-md text-body sm:text-title-sm lg:mx-0">
              {SITE.tagline}
            </p>

            {/* Trust badges (real figures) */}
            <div className="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {AVG_RATING && (
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1.5 text-body-sm font-bold text-ink shadow-sm">
                  <span className="text-accent">★</span> {AVG_RATING} average
                </span>
              )}
              <span className="rounded-pill bg-surface px-3 py-1.5 text-body-sm font-bold text-ink shadow-sm">
                {BOOKS.length} books
              </span>
              <span className="rounded-pill bg-surface px-3 py-1.5 text-body-sm font-bold text-ink shadow-sm">
                Ships from your local Amazon
              </span>
              <span className="rounded-pill bg-surface px-3 py-1.5 text-body-sm font-bold text-ink shadow-sm">
                Ages 3–12
              </span>
            </div>

            <div className="mt-7">
              <a
                href="#browse"
                className="inline-block rounded-pill bg-primary px-7 py-3 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
              >
                Browse all {BOOKS.length} books
              </a>
            </div>
          </div>

          {/* Right: fanned cover collage */}
          <div className="lg:pl-6">
            <HeroCovers />
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
