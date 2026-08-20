import Link from "next/link";
import type { Book } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { categoryColor } from "@/lib/categories";
import { Stars } from "@/components/Stars";

/**
 * A minimal, cover-forward book tile. Covers use a FIXED height so every tile
 * lines up regardless of the cover's exact proportions (no cropping). Below:
 * a colored category pill, a centered title, and a compact rating · age line.
 * The whole tile links to the book's detail page.
 */
export function BookCard({ book }: { book: Book }) {
  const color = categoryColor(book.category);
  return (
    <Link
      href={`/book/${book.slug}`}
      className="group flex flex-col items-center text-center focus-visible:outline-none"
    >
      <div className="flex h-44 items-end justify-center sm:h-52 lg:h-60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(book)}
          alt={`${book.title} cover`}
          loading="lazy"
          className="h-full w-auto max-w-full rounded-lg object-contain shadow-[0_6px_20px_rgba(20,30,50,0.12)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_12px_28px_rgba(20,30,50,0.18)] group-focus-visible:outline-2 group-focus-visible:outline-primary"
        />
      </div>
      <span
        className="mt-3 inline-block rounded-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
        style={{ backgroundColor: color }}
      >
        {book.category}
      </span>
      <h3 className="mt-1.5 line-clamp-2 text-title-sm font-medium text-ink">
        {book.title}
      </h3>
      <div className="mt-1 flex items-center justify-center gap-1.5 text-caption text-muted">
        {book.rating ? <Stars rating={book.rating} /> : null}
        <span className="font-semibold">
          {book.rating ? `· ${book.ages}` : book.ages}
        </span>
      </div>
    </Link>
  );
}
