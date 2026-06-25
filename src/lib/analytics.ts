/**
 * Lightweight server-side event logging for "buy_click" conversions.
 *
 * For launch this just structured-logs to the server console (visible in Vercel
 * function logs). It's deliberately swappable: when you want durable, exportable
 * rows, replace the body of logBuyClick() with a write to Vercel KV / a Supabase
 * table / your analytics provider — callers don't change.
 *
 * Page-view analytics is handled separately by Vercel Web Analytics (the
 * <Analytics /> component in the root layout / pages).
 */

export type BuyClickEvent = {
  book: string;
  country: string;
  marketplace: string;
  utmSource?: string;
};

export function logBuyClick(event: BuyClickEvent): void {
  // Structured single-line log → easy to grep/parse in Vercel logs.
  console.log("buy_click", JSON.stringify(event));
}
