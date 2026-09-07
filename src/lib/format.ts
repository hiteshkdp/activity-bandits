/** Display helpers shared by the catalogue, filters and cards. */

/** "Puzzles and Words" is too long for a chip/caption — show "Puzzles". */
export function categoryLabel(category: string): string {
  return category === "Puzzles and Words" ? "Puzzles" : category;
}

/** The "Travel · Ages 4-8" caption under a cover. */
export function bookMeta(category: string, ages: string): string {
  return `${categoryLabel(category)} · ${ages}`;
}
