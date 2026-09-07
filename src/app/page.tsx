import { BOOKS, CATEGORIES, AUTHORS } from "@/data/books";
import { BookBrowser } from "@/components/BookBrowser";
import { TopSellers } from "@/components/TopSellers";
import { AuthorRow } from "@/components/AuthorRow";
import { ValueProps } from "@/components/ValueProps";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";
import { categoryColor } from "@/lib/categories";

/** Popular genres surfaced in the hero (label + the real category value). */
const POPULAR: { label: string; category: string; emoji: string }[] = [
  { label: "Football", category: "Football", emoji: "⚽" },
  { label: "Travel", category: "Travel", emoji: "✈️" },
  { label: "Sport", category: "Sport", emoji: "🏅" },
  { label: "Puzzles", category: "Puzzles and Words", emoji: "🧩" },
  { label: "Reading", category: "Reading", emoji: "📚" },
  { label: "Animals", category: "Animals", emoji: "🐾" },
];

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
      <section className="overflow-hidden border-b border-hairline bg-surface-soft">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:py-20">
          <span className="text-caption font-bold uppercase tracking-[0.14em] text-primary">
            Activity books for kids
          </span>
          <h1 className="mt-4 text-display-md font-semibold text-ink sm:text-display-lg">
            Books that keep curious kids busy.
          </h1>
          <p className="mx-auto mt-4 max-w-[34rem] text-body-md text-body sm:text-title-sm">
            {SITE.tagline}
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
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

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#browse"
              className="inline-block rounded-pill bg-primary px-7 py-3 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
            >
              Browse all books
            </a>
            <a
              href="/play"
              className="inline-block rounded-pill border-2 border-primary bg-surface px-7 py-3 text-button font-bold text-primary shadow-sm transition-colors hover:bg-primary/10"
            >
              Play a free game →
            </a>
          </div>

          {/* Popular categories */}
          <div className="mt-10">
            <p className="text-caption font-bold uppercase tracking-[0.14em] text-muted">
              Popular categories
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {POPULAR.map((c) => {
                const color = categoryColor(c.category);
                return (
                  <a
                    key={c.label}
                    href={`/?theme=${encodeURIComponent(c.category)}#browse`}
                    className="group flex items-center gap-2.5 rounded-xl border border-hairline bg-surface px-4 py-2.5 font-bold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: `${color}55` }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-pill text-lg"
                      style={{ backgroundColor: `${color}22` }}
                      aria-hidden
                    >
                      {c.emoji}
                    </span>
                    <span className="text-body-md">{c.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why kids love us */}
      <ValueProps />

      {/* Social proof + featured */}
      {!activeCategory && (
        <>
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
