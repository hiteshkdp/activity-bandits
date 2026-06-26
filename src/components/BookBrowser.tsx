"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Book } from "@/data/books";
import { BookCard } from "@/components/BookCard";

type Props = {
  books: Book[];
  /** When set (via the Books menu / ?theme=), the grid is scoped to this genre. */
  activeCategory?: string | null;
};

export function BookBrowser({ books, activeCategory = null }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (activeCategory && b.category !== activeCategory) return false;
      if (q) {
        const hay = `${b.title} ${b.fullTitle ?? ""} ${b.blurb} ${b.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [books, query, activeCategory]);

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
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            onClick={() => setQuery("")}
            className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-button font-bold text-on-primary hover:bg-primary-strong"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
