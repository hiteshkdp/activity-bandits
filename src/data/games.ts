/**
 * Config + content for the free on-site games (the "Free Fun" hub).
 * Games are 100% client-side — no backend. Covers are reused from the catalogue
 * so there's nothing extra to host, and each game cross-sells a real book.
 */

/** Colourful covers used as the Memory Match cards (6 pairs = 12 cards). */
export const MEMORY_SLUGS: string[] = [
  "football-activity-book-for-kids",
  "airplane-activity-book-for-kids-ages-8-12",
  "ancient-egypt-activity-book-for-kids",
  "gymnastics-activity-book-for-girls",
  "pirate-activity-book-for-kids",
  "baseball-activity-book-for-kids",
];

/** Covers the Sliding Puzzle can scramble (a "new picture" button cycles them). */
export const PUZZLE_SLUGS: string[] = [
  "football-activity-book-for-kids",
  "ancient-egypt-activity-book-for-kids",
  "pirate-activity-book-for-kids",
  "gymnastics-activity-book-for-girls",
];

/** Book to point quiz players at when they finish. */
export const QUIZ_CROSS_SELL_SLUG = "amazing-football-facts-for-kids-ages-9-12";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number; // index of the correct option
};

/** Kid-friendly trivia — a fun mix tied loosely to the book themes. */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { q: "How many players are on a football team on the pitch?", options: ["9", "11", "13"], answer: 1 },
  { q: "Which animal is the tallest in the world?", options: ["Elephant", "Giraffe", "Horse"], answer: 1 },
  { q: "What do you call a baby kangaroo?", options: ["Joey", "Cub", "Calf"], answer: 0 },
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: 1 },
  { q: "The Ancient Egyptians built huge tombs called…?", options: ["Pyramids", "Castles", "Igloos"], answer: 0 },
  { q: "How many legs does a spider have?", options: ["6", "8", "10"], answer: 1 },
  { q: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Zebra"], answer: 0 },
  { q: "Which ocean is the biggest?", options: ["Atlantic", "Indian", "Pacific"], answer: 2 },
  { q: "A group of lions is called a…?", options: ["Pack", "Pride", "Herd"], answer: 1 },
  { q: "How many sides does a triangle have?", options: ["3", "4", "5"], answer: 0 },
];
