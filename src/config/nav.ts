/**
 * Top-navigation items (besides the "Books" themes dropdown, which is built
 * from the catalogue genres). Add/reorder items here — new pages just need a
 * matching route under src/app/.
 */
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Free Stuff", href: "/free-stuff" },
];

/** Build the /?theme= link for a genre. */
export function themeHref(category: string): string {
  return `/?theme=${encodeURIComponent(category)}#browse`;
}
