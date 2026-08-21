import { BOOKS, CATEGORIES, AUTHORS } from "@/data/books";
import { BookBrowser } from "@/components/BookBrowser";
import { Hero } from "@/components/Hero";
import { WaveDivider } from "@/components/WaveDivider";
import { PopularCategories } from "@/components/PopularCategories";
import { Bestsellers } from "@/components/Bestsellers";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { AuthorRow } from "@/components/AuthorRow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

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

      <Hero />

      {/* Home-only bands (hidden when browsing a single theme) */}
      {!activeCategory && (
        <>
          <WaveDivider bg="#f6f2ea" fill="#fbc02d" />
          <PopularCategories />
          <WaveDivider bg="#fbc02d" fill="#d9f2f5" />
          <Bestsellers />
          <ReviewsStrip />
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
