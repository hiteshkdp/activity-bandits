import type { MetadataRoute } from "next";

/**
 * Crawl rules.
 *
 * `/go/` is disallowed on purpose: those are the Amazon buy redirects, and
 * every one of them fires a `buy_click` analytics event. The home page alone
 * links to ~178 of them, so an unrestricted crawler walks the catalogue and
 * manufactures a full set of fake "purchase intent" events in one pass.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/go/",
    },
  };
}
