import { BOOKS } from "@/data/books";
import { BookCard } from "@/components/BookCard";

/**
 * A labelled home-page row showing all books by one pen name (in catalogue
 * order). Used to give a pen name — e.g. the Harry Kicker reading series — its
 * own heading/section near the top of the page.
 */
export function AuthorRow({
  author,
  heading,
  subtitle,
  anchor,
}: {
  author: string;
  heading: string;
  subtitle?: string;
  anchor?: string;
}) {
  const books = BOOKS.filter((b) => b.author === author);
  if (books.length === 0) return null;

  return (
    <section id={anchor} className="border-b border-hairline scroll-mt-20">
      <div className="mx-auto max-w-[88rem] px-5 py-10 sm:py-12">
        <div className="mb-1 flex items-baseline justify-between gap-3">
          <h2 className="text-title-lg font-semibold text-ink">{heading}</h2>
          <span className="text-body-sm font-semibold text-muted">
            {books.length} {books.length === 1 ? "book" : "books"}
          </span>
        </div>
        {subtitle && (
          <p className="mb-6 max-w-[40rem] text-body-md text-body">{subtitle}</p>
        )}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
