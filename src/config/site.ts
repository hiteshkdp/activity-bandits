/**
 * Site-wide branding & configuration.
 *
 * This is the one place to edit your author brand, taglines, social links,
 * and (later) your Amazon Associates affiliate tags. Nothing here requires
 * touching component or route code.
 */

import type { MarketplaceCode } from "@/data/marketplaces";

export const SITE = {
  /** Your author / pen name or series brand — shown in the header & titles. */
  authorName: "Activity Bandits",

  /**
   * Path to your logo image (in /public). Rendered as a rounded mark next to
   * the wordmark. Set to "" to fall back to the placeholder mark.
   */
  logo: "/activitybanditslogo.png",

  /** One-line hook shown under the hero and in link previews. */
  tagline: "Fun activity & puzzle books for kids — tap any cover to grab it from your local Amazon store.",

  /**
   * ⚠️ PLACEHOLDER — replace with your real inbox before going live.
   * Used by the Contact page (the mailto button and the message form).
   */
  contactEmail: "hello@example.com",

  /**
   * Canonical site URL — used for canonical + OpenGraph links.
   *
   * Defaults to the live domain, so no env var is required. Set
   * NEXT_PUBLIC_SITE_URL to override (e.g. on a preview deployment).
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://activitybandits.com"),

  /** Social links shown in the footer. Leave blank to hide. */
  socials: {
    tiktok: "", // e.g. "https://www.tiktok.com/@yourhandle"
    instagram: "",
    website: "",
  },
} as const;

/**
 * Amazon Associates affiliate tags, per marketplace.
 *
 * LEFT INTENTIONALLY EMPTY — this is the "hook" only. When/if you join the
 * Associates programme and decide to use it, drop your per-marketplace tracking
 * IDs here and `withAffiliateTag()` will start appending them automatically.
 * Remember: turning these on may require a visible affiliate disclosure on the
 * site (see the plan's compliance note).
 *
 * Example:
 *   US: "yourtag-20",
 *   UK: "yourtag-21",
 */
export const AFFILIATE_TAGS: Partial<Record<MarketplaceCode, string>> = {
  // US: "yourtag-20",
  // UK: "yourtag-21",
};
