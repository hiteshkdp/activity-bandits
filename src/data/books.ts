/**
 * The book catalogue.
 *
 * THIS is the file you edit to add / update books. Everything else on the site
 * is driven by this list. To add a book: copy a block, fill in the title, a
 * trimmed blurb, and the ASIN for each marketplace where it's published.
 *
 * Covers: leave `cover` undefined to use the Amazon-hosted cover (derived from
 * the US ASIN, or the default ASIN). To self-host instead, drop a file in
 * public/covers/<slug>.jpg and set cover: "/covers/<slug>.jpg".
 */

import type { MarketplaceCode } from "@/data/marketplaces";

export type Book = {
  /** URL-safe id — becomes /book/<slug> and /go/<slug>. */
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  /** Short, card-sized hook (trimmed from the Amazon description). */
  blurb: string;
  /** Optional star rating for social proof (e.g. 4.6). */
  rating?: number;
  /**
   * Optional explicit cover. Omit to auto-derive the Amazon cover from the ASIN.
   * Set to "/covers/<slug>.jpg" to self-host later.
   */
  cover?: string;
  /**
   * Optional ASIN to pull the Amazon cover from. Use the PAPERBACK / print
   * ASIN (= ISBN-10) here — Amazon's cover endpoint only serves real images for
   * print editions, not Kindle (B0…) ASINs. Leave undefined for print books
   * whose default ASIN is already the print one. For Kindle-only titles, set
   * `cover` to a self-hosted file instead.
   */
  coverAsin?: string;
  /** Per-marketplace ASIN. List only the stores where the book is published. */
  asins: Partial<Record<MarketplaceCode, string>>;
  /** Fallback ASIN used when a visitor's marketplace has no specific edition. */
  defaultAsin: string;
};

/**
 * SAMPLE DATA — replace with your real books.
 * The ASINs below are placeholders so the site renders end-to-end; swap in your
 * actual titles, blurbs, and ASINs (from each book's Amazon page or KDP shelf).
 */
export const BOOKS: Book[] = [
  {
    slug: "sample-book-one",
    title: "Sample Book One",
    subtitle: "A placeholder subtitle",
    author: "Your Author Name",
    blurb:
      "A one or two sentence hook that makes a TikTok viewer want to tap. Replace this with a trimmed version of your Amazon description.",
    rating: 4.7,
    asins: {
      US: "B00SAMPLE1",
      UK: "B00SAMPLE1UK",
      DE: "B00SAMPLE1DE",
    },
    defaultAsin: "B00SAMPLE1",
  },
  {
    slug: "sample-book-two",
    title: "Sample Book Two",
    author: "Your Author Name",
    blurb:
      "Another punchy hook goes here. Keep it short — this shows on the card and at the top of the book page.",
    rating: 4.5,
    asins: {
      US: "B00SAMPLE2",
      UK: "B00SAMPLE2UK",
    },
    defaultAsin: "B00SAMPLE2",
  },
  {
    slug: "sample-book-three",
    title: "Sample Book Three",
    author: "Your Author Name",
    blurb:
      "A third sample so you can see the grid layout with multiple books. Replace all of these with your real catalogue.",
    asins: {
      US: "B00SAMPLE3",
    },
    defaultAsin: "B00SAMPLE3",
  },
];

/** Look up a book by its slug. */
export function getBook(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
