"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Book } from "@/data/books";
import { BookCard } from "@/components/BookCard";

type Props = {
  books: Book[];
  /** When set (via the Books menu / ?theme=), the grid is scoped to this genre. */
  activeCategory?: string | null;
  /** Pen names available to filter by (omit/single → no author filter shown). */
  authors?: string[];
};

export function BookBrowser({ books, activeCategory = null, authors = [] }: Props) {
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (activeCategory && b.category !== activeCategory) return false;
      if (author && b.author !== author) return false;
      if (q) {
        const hay = `${b.title} ${b.fullTitle ?? ""} ${b.blurb} ${b.category} ${b.author}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [books, query, activeCategory, author]);

  return (
    <div>
      {/* Theme heading */}
      {activeCategory && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-title-lg font-bold text-ink">{activeCategory} books</h2>
          <Link
            href="/#browse"
            className="text-button font-bold text-primary hover:text-primary-strong"
          >
            ← All books
          </Link>
        </div>
      )}

      {/* Pen-name filter */}
      {authors.length > 1 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <AuthorChip active={author === null} onClick={() => setAuthor(null)}>
            All authors
          </AuthorChip>
          {authors.map((a) => (
            <AuthorChip
              key={a}
              active={author === a}
              onClick={() => setAuthor(author === a ? null : a)}
            >
              {a}
            </AuthorChip>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative mx-auto mb-3 max-w-[34rem]">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            activeCategory
              ? `Search ${activeCategory} books…`
              : "Search books — try “football”, “travel”, “unicorn”…"
          }
          className="w-full rounded-lg border border-hairline bg-surface py-3 pl-11 pr-4 text-body-md text-ink shadow-sm outline-none placeholder:text-muted focus:border-primary"
        />
      </div>

      {/* Result count */}
      <p className="mb-8 text-center text-body-sm font-semibold text-muted">
        {filtered.length} {filtered.length === 1 ? "book" : "books"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-hairline bg-surface px-6 py-16 text-center">
          <p className="text-title-sm font-bold text-ink">No books found</p>
          <p className="mt-1 text-body-sm text-muted">
            Try a different search term.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setAuthor(null);
            }}
            className="mt-4 rounded-pill bg-primary px-5 py-2.5 text-button font-bold text-on-primary hover:bg-primary-strong"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function AuthorChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-pill border px-4 py-1.5 text-body-sm font-bold transition-colors ${
        active
          ? "border-transparent bg-primary text-on-primary shadow-sm"
          : "border-hairline bg-surface text-body hover:border-primary hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
