/**
 * Home-page curation: what appears in the featured band, the Top sellers grid,
 * the Harry Kicker series row, the category tiles and the filter chips.
 */

/** Left half of the dark band under the hero — the "Most popular" spot. */
export const FEATURED_SLUG = "airplane-activity-book-for-kids-ages-4-8";

/** Right half of that band — the "New release" spot. Swap this on launch day. */
export const NEW_RELEASE_SLUG = "gymnastics-coloring-book-for-girls";

/** Top sellers grid (left → right). Use each book's `slug`. */
export const TOP_SELLER_SLUGS: string[] = [
  "football-word-search-book-for-kids",
  "would-you-rather-football-book-for-kids-ages-6-12",
  "guess-the-football-player-for-kids-for-ages-6-12",
  "airplane-activity-book-for-kids-ages-8-12",
  "ancient-egypt-activity-puzzle-book-for-kids",
  "airplane-activity-book-for-kids-ages-4-8",
  "gymnastics-activity-book-for-girls",
  "ice-hockey-activity-book-for-kids",
];

/**
 * Books that carry the green "Parents love it" flag on their card.
 * Add a slug here to badge it; remove to drop the badge.
 */
export const PARENTS_LOVE_IT: string[] = [
  "airplane-activity-book-for-kids-ages-8-12",
];

/** Harry Kicker reading series, in story order. */
export const SERIES_SLUGS: string[] = [
  "the-teamwork-triumph",
  "courage-on-the-pitch",
  "bravery-in-the-big-game",
  "the-goal-that-didn-t-count",
];

/** The three covers shown beside the hero copy. */
export const HERO_COVER_SLUGS: string[] = [
  "airplane-activity-book-for-kids-ages-8-12",
  "football-word-search-book-for-kids",
  "would-you-rather-football-book-for-kids-ages-6-12",
];

/** Illustrated "Pick a theme" tiles. `filter` must match a chip below. */
export const CATEGORY_TILES: {
  label: string;
  filter: string;
  art: string;
  alt: string;
}[] = [
  { label: "Football", filter: "Football", art: "/art/footballer.png", alt: "Illustrated footballer striking a ball" },
  { label: "Travel", filter: "Travel", art: "/art/airplane-icon.png", alt: "Illustrated aeroplane" },
  { label: "Sport", filter: "Sport", art: "/art/sport-icon.png", alt: "Illustrated sports balls and trophy" },
  { label: "Puzzles", filter: "Puzzles and Words", art: "/art/puzzle-icon.png", alt: "Illustrated jigsaw globe" },
  { label: "Reading", filter: "Reading", art: "/art/reading-icon.png", alt: "Illustrated child reading a book" },
  { label: "Girls", filter: "Girls", art: "/art/girls-icon.png", alt: "Illustrated princess" },
];

/** Catalogue filter chips, in display order. "All" first. */
export const FILTERS: string[] = [
  "All",
  "Football",
  "Travel",
  "Sport",
  "Puzzles and Words",
  "Reading",
  "Animals",
  "Toddlers",
  "Girls",
  "Trucks",
  "Hobbies",
  "History",
  "Gymnastics",
  "Siblings",
  "Would You Rather",
  "Fashion",
  "Golf",
  "Ninja",
  "Pirates",
];

/**
 * "Girls" is deliberately broader than the `Girls` category — it also sweeps in
 * Gymnastics, Fashion and any title about girls/ballerinas/unicorns/princesses.
 */
const GIRLS_CATEGORIES = ["Girls", "Gymnastics", "Fashion"];
const GIRLS_TITLE = /girl|ballerina|unicorn|princess/i;

export function matchesFilter(
  book: { category: string; title: string },
  filter: string,
): boolean {
  if (filter === "All") return true;
  if (filter === "Girls") {
    return (
      GIRLS_CATEGORIES.includes(book.category) || GIRLS_TITLE.test(book.title)
    );
  }
  return book.category === filter;
}
