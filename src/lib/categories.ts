/**
 * Accent color per genre — used for the category pill on book cards.
 * The pill renders as the color's text on a soft tint of the same color.
 * Colors are mid-dark so they stay readable on the light tint.
 */

const PALETTE: Record<string, string> = {
  Football: "#2f9e6f",
  Travel: "#2f7fd1",
  Sport: "#d4682a",
  "Puzzles and Words": "#7c5cd6",
  Animals: "#d8568a",
  History: "#bd8418",
  Toddlers: "#129aa8",
  Girls: "#cf4d86",
  Hobbies: "#7a8b2f",
  Siblings: "#4f7bab",
  Fashion: "#bb4f97",
  Golf: "#3a9e6a",
  Gymnastics: "#a85a86",
  Ninja: "#566173",
  Pirates: "#8a6a32",
  Trucks: "#c0632a",
  "Would You Rather": "#5f8a36",
};

const FALLBACK = "#14b3c2";

export function categoryColor(category: string): string {
  return PALETTE[category] ?? FALLBACK;
}
