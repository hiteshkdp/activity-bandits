/**
 * Amazon Associates affiliate hook.
 *
 * Currently a near-no-op: if a tag is configured for the marketplace in
 * AFFILIATE_TAGS it gets appended as `?tag=...`, otherwise the URL is returned
 * unchanged. Since AFFILIATE_TAGS ships empty, today this changes nothing —
 * it's the single, future-proof place to switch affiliate links on later.
 */

import { AFFILIATE_TAGS } from "@/config/site";
import type { MarketplaceCode } from "@/data/marketplaces";

export function withAffiliateTag(
  url: string,
  marketplace: MarketplaceCode,
): string {
  const tag = AFFILIATE_TAGS[marketplace];
  if (!tag) return url;

  const u = new URL(url);
  u.searchParams.set("tag", tag);
  return u.toString();
}
