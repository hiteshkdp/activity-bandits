import Link from "next/link";
import type { Book } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { Stars } from "@/components/Stars";

/** A single book tile in the home grid. Links to the book's detail page. */
export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-hairline-on-dark bg-surface-card-dark transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-elevated-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(book)}
          alt={`${book.title} cover`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-title-sm font-semibold text-on-dark">{book.title}</h3>
        {book.rating ? <Stars rating={book.rating} /> : null}
        <p className="line-clamp-3 text-body-sm text-muted">{book.blurb}</p>
        <span className="mt-auto pt-2 text-button font-semibold text-primary">
          View book →
        </span>
      </div>
    </Link>
  );
}
