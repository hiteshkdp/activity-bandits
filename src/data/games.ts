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

export type FootballerRound = {
  /** Three clues, revealed one at a time. */
  clues: [string, string, string];
  /** The correct player (must also appear in `options`). */
  answer: string;
  /** Four names to choose from, including the answer. */
  options: string[];
};

/** "Guess the Footballer" — 3 clues per famous player, then pick the name. */
export const FOOTBALLER_ROUNDS: FootballerRound[] = [
  {
    clues: [
      "I was born in Argentina in 1987.",
      "I spent most of my career at Barcelona.",
      "I've won the Ballon d'Or a record number of times.",
    ],
    answer: "Lionel Messi",
    options: ["Neymar", "Lionel Messi", "Luis Suárez", "Sergio Agüero"],
  },
  {
    clues: [
      "I was born in Portugal, on the island of Madeira.",
      "I've played for Manchester United, Real Madrid and Juventus.",
      "I'm famous for my 'Siuu!' celebration.",
    ],
    answer: "Cristiano Ronaldo",
    options: ["Gareth Bale", "Karim Benzema", "Cristiano Ronaldo", "Luka Modrić"],
  },
  {
    clues: [
      "I'm a French forward known for my incredible speed.",
      "I won the World Cup with France in 2018 as a teenager.",
      "I made my name at Monaco and Paris Saint-Germain.",
    ],
    answer: "Kylian Mbappé",
    options: ["Kylian Mbappé", "Antoine Griezmann", "Paul Pogba", "Olivier Giroud"],
  },
  {
    clues: [
      "I'm a Brazilian forward known for my tricks and flair.",
      "I became the most expensive player ever when I joined PSG in 2017.",
      "I started my career at Santos in Brazil.",
    ],
    answer: "Neymar",
    options: ["Vinícius Júnior", "Rivaldo", "Neymar", "Ronaldinho"],
  },
  {
    clues: [
      "I'm a Norwegian striker who scores lots and lots of goals.",
      "I joined Manchester City in 2022.",
      "My dad was also a professional footballer.",
    ],
    answer: "Erling Haaland",
    options: ["Harry Kane", "Erling Haaland", "Robert Lewandowski", "Darwin Núñez"],
  },
  {
    clues: [
      "I'm an Egyptian forward nicknamed the 'Egyptian King'.",
      "I play on the right wing for Liverpool.",
      "I've won the Premier League Golden Boot several times.",
    ],
    answer: "Mohamed Salah",
    options: ["Sadio Mané", "Mohamed Salah", "Riyad Mahrez", "Roberto Firmino"],
  },
  {
    clues: [
      "I'm a Belgian midfielder famous for my passing.",
      "I play for Manchester City.",
      "I'm known for setting up tons of goals for my teammates.",
    ],
    answer: "Kevin De Bruyne",
    options: ["Kevin De Bruyne", "Bruno Fernandes", "Eden Hazard", "Ilkay Gündoğan"],
  },
  {
    clues: [
      "I'm an English striker and captain of my national team.",
      "I spent most of my career at Tottenham before moving to Bayern Munich.",
      "I'm England's all-time top goalscorer.",
    ],
    answer: "Harry Kane",
    options: ["Marcus Rashford", "Raheem Sterling", "Harry Kane", "Phil Foden"],
  },
  {
    clues: [
      "I'm a Croatian midfielder.",
      "I won the Ballon d'Or in 2018.",
      "I've played for Real Madrid for many years.",
    ],
    answer: "Luka Modrić",
    options: ["Ivan Rakitić", "Toni Kroos", "Luka Modrić", "Andrés Iniesta"],
  },
  {
    clues: [
      "I'm a Brazilian winger known for my dazzling dribbling.",
      "I play for Real Madrid.",
      "I scored the winning goal in the 2022 Champions League final.",
    ],
    answer: "Vinícius Júnior",
    options: ["Rodrygo", "Vinícius Júnior", "Antony", "Richarlison"],
  },
];

/** Book to point players at when they finish "Guess the Footballer". */
export const FOOTBALLER_CROSS_SELL_SLUG =
  "guess-the-football-player-for-kids-for-ages-6-12";

export type WouldYouRatherQuestion = {
  a: string;
  b: string;
};

/** "Would You Rather? Football" — pick A or B, just for fun (no wrong answers). */
export const WYR_FOOTBALL_QUESTIONS: WouldYouRatherQuestion[] = [
  {
    a: "Score the winning goal in a World Cup final",
    b: "Save the penalty that wins the World Cup",
  },
  {
    a: "Play for your favourite club team",
    b: "Play for your country at the World Cup",
  },
  {
    a: "Be the fastest player on the pitch",
    b: "Have the most powerful shot in the world",
  },
  {
    a: "Score an amazing overhead bicycle kick",
    b: "Score a curling free-kick into the top corner",
  },
  {
    a: "Be an unbeatable goalkeeper",
    b: "Be an unstoppable striker",
  },
];

/** Book to point players at when they finish "Would You Rather? Football". */
export const WYR_FOOTBALL_BOOK =
  "would-you-rather-football-book-for-kids-ages-6-12";

/** Book to point quiz players at when they finish. */
export const QUIZ_CROSS_SELL_SLUG = "amazing-football-facts-for-kids-ages-9-12";

/** Football word search teaser — words hidden in the grid + the book to buy. */
export const FOOTBALL_WORDS: string[] = [
  "GOAL",
  "KEEPER",
  "STRIKER",
  "PENALTY",
  "OFFSIDE",
  "WINGER",
  "HEADER",
  "TROPHY",
  "CORNER",
  "VOLLEY",
];
export const FOOTBALL_WORDSEARCH_BOOK = "football-word-search-book-for-kids";

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
