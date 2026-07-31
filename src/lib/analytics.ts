/**
 * "buy_click" conversion tracking.
 *
 * Sends a custom event to Vercel Web Analytics (same product as the pageview
 * <Analytics /> in the root layout) AND structured-logs to the server console
 * as a fallback (visible in Vercel function logs). Fired from the /go/[slug]
 * redirect via `after()` so it never delays the redirect to Amazon.
 *
 * In the Vercel dashboard: Project → Analytics → Events → "buy_click", broken
 * down by book / country / marketplace / source (TikTok utm).
 */

import { track } from "@vercel/analytics/server";

export type BuyClickEvent = {
  book: string;
  country: string;
  marketplace: string;
  utmSource?: string;
};

export async function logBuyClick(event: BuyClickEvent): Promise<void> {
  // Structured single-line log → easy to grep/parse in Vercel logs.
  console.log("buy_click", JSON.stringify(event));
  try {
    await track("buy_click", {
      book: event.book,
      country: event.country,
      marketplace: event.marketplace,
      source: event.utmSource ?? "direct",
    });
  } catch {
    // Analytics must never break the redirect — swallow any error.
  }
}
