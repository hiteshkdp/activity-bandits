import { getBook } from "@/data/books";
import { TOP_SELLER_SLUGS } from "@/data/featured";
import { BookCard } from "@/components/BookCard";

/** "Top sellers" row, shown under the hero. Driven by TOP_SELLER_SLUGS. */
export function TopSellers() {
  const books = TOP_SELLER_SLUGS.map(getBook).filter(
    (b): b is NonNullable<typeof b> => Boolean(b),
  );
  if (books.length === 0) return null;

  return (
    <section className="border-b border-hairline bg-surface-soft">
      <div className="mx-auto max-w-[88rem] px-5 py-10 sm:py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-title-lg font-semibold text-ink">Top sellers</h2>
          <a
            href="#browse"
            className="text-button font-bold text-primary hover:text-primary-strong"
          >
            See all →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {books.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
