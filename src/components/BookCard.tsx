import Link from "next/link";
import type { Book } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { categoryColor } from "@/lib/categories";

/**
 * A "product tile" book card (LEGO-store style): white card, cover on a soft
 * top panel with a sharp price-tag category badge overlaid, then title + ages
 * below. Covers use a FIXED height so every tile lines up (no cropping). The
 * whole tile links to the book's detail page.
 */
export function BookCard({ book }: { book: Book }) {
  const color = categoryColor(book.category);
  return (
    <Link
      href={`/book/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-hairline bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
    >
      {/* Cover panel */}
      <div className="relative flex h-40 items-center justify-center bg-surface-soft p-3 sm:h-48 lg:h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(book)}
          alt={`${book.title} cover`}
          loading="lazy"
          className="max-h-full w-auto max-w-full rounded object-contain shadow-sm transition-transform duration-200 group-hover:scale-[1.03]"
        />
        <span
          className="absolute left-2 top-2 rounded-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
          style={{ backgroundColor: color }}
        >
          {book.category}
        </span>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-title-sm font-bold text-ink">
          {book.title}
        </h3>
        <div className="mt-auto flex items-center gap-1.5 pt-1 text-caption text-muted">
          <span className="font-semibold">{book.ages}</span>
        </div>
      </div>
    </Link>
  );
}
