/**
 * Amazon marketplaces + the country → marketplace routing table.
 *
 * The marketplace list mirrors the set proven in KDP Ads Autopilot
 * (US, UK, CA, DE, FR, ES, IT, JP, AU, IN, MX, NL, BR). To support a new
 * marketplace, add it to MARKETPLACES and point the relevant countries at it
 * in COUNTRY_TO_MARKETPLACE.
 */

export type MarketplaceCode =
  | "US"
  | "UK"
  | "CA"
  | "DE"
  | "FR"
  | "ES"
  | "IT"
  | "JP"
  | "AU"
  | "IN"
  | "MX"
  | "NL"
  | "BR";

export type Marketplace = {
  /** Top-level domain for the store, used to build amazon.<tld>. */
  tld: string;
  /** Human label for UI / analytics. */
  label: string;
};

export const MARKETPLACES: Record<MarketplaceCode, Marketplace> = {
  US: { tld: "com", label: "Amazon.com" },
  UK: { tld: "co.uk", label: "Amazon.co.uk" },
  CA: { tld: "ca", label: "Amazon.ca" },
  DE: { tld: "de", label: "Amazon.de" },
  FR: { tld: "fr", label: "Amazon.fr" },
  ES: { tld: "es", label: "Amazon.es" },
  IT: { tld: "it", label: "Amazon.it" },
  JP: { tld: "co.jp", label: "Amazon.co.jp" },
  AU: { tld: "com.au", label: "Amazon.com.au" },
  IN: { tld: "in", label: "Amazon.in" },
  MX: { tld: "com.mx", label: "Amazon.com.mx" },
  NL: { tld: "nl", label: "Amazon.nl" },
  BR: { tld: "com.br", label: "Amazon.com.br" },
};

/** When we can't determine (or don't serve) a visitor's country, use this. */
export const DEFAULT_MARKETPLACE: MarketplaceCode = "US";

/**
 * ISO 3166-1 alpha-2 country code → the Amazon store that country should use.
 *
 * Countries without their own Amazon store are routed to the nearest store
 * that ships to them (e.g. IE → UK, AT/CH → DE, NZ → AU). Anything not listed
 * falls back to DEFAULT_MARKETPLACE in code.
 */
export const COUNTRY_TO_MARKETPLACE: Record<string, MarketplaceCode> = {
  // North America
  US: "US",
  CA: "CA",
  MX: "MX",

  // UK & Ireland
  GB: "UK",
  IE: "UK",

  // Germany + German-speaking / nearby that buy from .de
  DE: "DE",
  AT: "DE",
  CH: "DE",
  PL: "DE",
  CZ: "DE",
  DK: "DE",
  SE: "DE",
  NO: "DE",
  FI: "DE",

  // France & French-speaking nearby
  FR: "FR",
  BE: "FR",
  LU: "FR",
  MC: "FR",

  // Iberia
  ES: "ES",
  PT: "ES",

  // Italy
  IT: "IT",

  // Netherlands
  NL: "NL",

  // Japan
  JP: "JP",

  // Australia / NZ
  AU: "AU",
  NZ: "AU",

  // India
  IN: "IN",

  // Brazil
  BR: "BR",
};

/** Resolve a (possibly undefined) country code to a marketplace. */
export function marketplaceForCountry(
  country: string | null | undefined,
): MarketplaceCode {
  if (!country) return DEFAULT_MARKETPLACE;
  return COUNTRY_TO_MARKETPLACE[country.toUpperCase()] ?? DEFAULT_MARKETPLACE;
}
