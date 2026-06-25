/**
 * Geo-aware "Buy" redirect.
 *
 *   GET /go/<slug>  →  302 to the correct Amazon store + ASIN for the visitor.
 *
 * Country detection uses Vercel's edge header `x-vercel-ip-country`, which is
 * populated automatically on Vercel for every request (no extra dependency).
 * In local dev that header is absent, so we also honor a `?country=GB` query
 * override for testing; on production the header always wins.
 */

import { NextResponse, type NextRequest } from "next/server";
import { getBook } from "@/data/books";
import { MARKETPLACES, marketplaceForCountry } from "@/data/marketplaces";
import { amazonProductUrl } from "@/lib/amazon";
import { withAffiliateTag } from "@/lib/affiliate";
import { logBuyClick } from "@/lib/analytics";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const book = getBook(slug);

  // Unknown book → send them to the home page rather than a dead end.
  if (!book) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  // Detect country: real edge header first, dev/test query override second.
  const headerCountry = request.headers.get("x-vercel-ip-country");
  const queryCountry = request.nextUrl.searchParams.get("country");
  const country = (headerCountry || queryCountry || "").toUpperCase();

  const marketplace = marketplaceForCountry(country);

  // Build the destination, then run it through the (currently no-op) affiliate hook.
  const productUrl = amazonProductUrl(book, marketplace);
  const destination = withAffiliateTag(productUrl, marketplace);

  // Record the conversion intent (book + where they were sent).
  logBuyClick({
    book: book.slug,
    country: country || "UNKNOWN",
    marketplace: MARKETPLACES[marketplace].label,
    utmSource: request.nextUrl.searchParams.get("utm_source") ?? undefined,
  });

  return NextResponse.redirect(destination, 302);
}
