import { BOOKS, CATEGORIES } from "@/data/books";
import { BookBrowser } from "@/components/BookBrowser";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { TopSellers } from "@/components/TopSellers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

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
      <section className="border-b border-hairline bg-surface-soft">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-24">
          <span className="text-caption font-bold uppercase tracking-[0.14em] text-primary">
            Activity books for kids
          </span>
          <h1 className="mt-4 text-display-md font-semibold text-ink sm:text-display-lg">
            Books that keep curious kids busy.
          </h1>
          <p className="mx-auto mt-4 max-w-[34rem] text-body-md text-body sm:text-title-sm">
            {SITE.tagline}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="#browse"
              className="rounded-lg bg-primary px-7 py-3 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
            >
              Browse all {BOOKS.length} books
            </a>
            <span className="text-body-sm font-semibold text-muted">
              Ships from your local Amazon · Ages 3–12
            </span>
          </div>
        </div>
      </section>

      {/* Social proof + featured */}
      {!activeCategory && (
        <>
          <ReviewsStrip />
          <TopSellers />
        </>
      )}

      {/* Browse */}
      <main id="browse" className="mx-auto w-full max-w-[88rem] flex-1 px-5 py-12">
        <BookBrowser
          key={activeCategory ?? "all"}
          books={BOOKS}
          activeCategory={activeCategory}
        />
      </main>

      <SiteFooter />
    </>
  );
}
