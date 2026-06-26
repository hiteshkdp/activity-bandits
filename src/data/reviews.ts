/**
 * Customer reviews shown in the scrolling strip under the hero.
 *
 * ⚠️ PLACEHOLDERS — replace every entry below with REAL reviews from your
 * Amazon product pages before going live. Don't ship invented reviews; copy the
 * actual wording, keep it short, and use the reviewer's first name (or
 * "Verified buyer"). Amazon doesn't expose review text in the page source, so
 * these can't be auto-pulled — paste your favourites here.
 */
export type Review = {
  quote: string;
  name: string;
  rating?: number; // 1–5; defaults to 5 in the UI
};

export const REVIEWS: Review[] = [
  { quote: "My kids were quiet for the whole flight — worth every penny.", name: "Verified buyer", rating: 5 },
  { quote: "Brilliant for car journeys. Bought three more as gifts.", name: "Verified buyer", rating: 5 },
  { quote: "Great mix of mazes and puzzles, kept my 7-year-old busy for hours.", name: "Verified buyer", rating: 5 },
  { quote: "Lovely quality and the perfect level for this age group.", name: "Verified buyer", rating: 5 },
  { quote: "Exactly what I was looking for — fun and educational.", name: "Verified buyer", rating: 5 },
];
