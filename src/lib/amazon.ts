/**
 * Amazon URL + cover-image helpers.
 *
 * Pure functions, no side effects — easy to unit-test and reuse from both the
 * redirect route and the page components.
 */

import { MARKETPLACES, type MarketplaceCode } from "@/data/marketplaces";
import type { Book } from "@/data/books";

/** The ASIN to use for a given book in a given marketplace (with fallback). */
export function asinForMarketplace(
  book: Book,
  marketplace: MarketplaceCode,
): string {
  return book.asins[marketplace] ?? book.defaultAsin;
}

/** Build the canonical Amazon product URL for a book in a marketplace. */
export function amazonProductUrl(
  book: Book,
  marketplace: MarketplaceCode,
): string {
  const { tld } = MARKETPLACES[marketplace];
  const asin = asinForMarketplace(book, marketplace);
  return `https://www.amazon.${tld}/dp/${asin}`;
}

/**
 * Amazon-hosted cover image for a book.
 *
 * Priority:
 *   1. An explicit `book.cover` (self-hosted path or any URL) — always wins.
 *   2. The Amazon image CDN, derived from an ASIN:
 *        https://m.media-amazon.com/images/P/<ASIN>._SL500_.jpg
 *
 * ⚠️ IMPORTANT (verified against Amazon): the /images/P/<ASIN> endpoint only
 * serves a real cover for PRINT editions, where the ASIN equals the ISBN-10
 * (e.g. paperbacks / low-content books). For KINDLE-only ASINs (B0…) it returns
 * a blank 1×1 pixel. So:
 *   - Set `coverAsin` to the book's PAPERBACK ASIN/ISBN-10 to pull the cover
 *     even if the default buy ASIN is the Kindle edition.
 *   - For Kindle-only titles with no print edition, self-host the cover via
 *     `cover: "/covers/<slug>.jpg"`.
 *
 * `coverAsin` → US ASIN → default ASIN is the resolution order.
 */
export function coverUrl(book: Book): string {
  if (book.cover) return book.cover;
  const asin = book.coverAsin ?? book.asins.US ?? book.defaultAsin;
  return `https://m.media-amazon.com/images/P/${asin}._SL500_.jpg`;
}
