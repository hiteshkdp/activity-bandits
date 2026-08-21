import Link from "next/link";
import { themeHref } from "@/config/nav";

/** label = shown text, category = the genre value used by the browse filter. */
const CATS: { label: string; category: string; icon: React.ReactNode }[] = [
  {
    label: "Travel",
    category: "Travel",
    icon: (
      <svg viewBox="0 0 60 60" className="w-9">
        <path d="M6 34l48-18-9 20-10 3-6 13-4-11-19-7z" fill="#2f89c5" />
        <path d="M30 30l16-8" stroke="#1c6591" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Football",
    category: "Football",
    icon: (
      <svg viewBox="0 0 60 60" className="w-9">
        <circle cx="30" cy="30" r="18" fill="#fff" stroke="#232a33" strokeWidth="3" />
        <path d="M30 16l7 5-3 8h-8l-3-8z" fill="#232a33" />
        <path d="M15 24l6-4M45 24l-6-4M22 43l3-7M38 43l-3-7" stroke="#232a33" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Sports",
    category: "Sport",
    icon: (
      <svg viewBox="0 0 60 60" className="w-9">
        <path d="M20 12h20v12a10 10 0 01-20 0z" fill="#f2b33a" stroke="#c9871a" strokeWidth="2.5" />
        <path d="M20 15h-7c0 8 3 11 7 12M40 15h7c0 8-3 11-7 12" stroke="#c9871a" strokeWidth="2.5" fill="none" />
        <path d="M27 34h6v7h-6z" fill="#c9871a" />
        <path d="M18 41h24v5H18z" fill="#c9871a" />
      </svg>
    ),
  },
  {
    label: "Puzzles",
    category: "Puzzles and Words",
    icon: (
      <svg viewBox="0 0 60 60" className="w-9">
        <path d="M14 16h14a5 5 0 019 0h9v11a5 5 0 000 9v11H32a5 5 0 00-9 0H14V16z" fill="#8b5cf6" stroke="#6b3fd4" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function PopularCategories() {
  return (
    <section className="bg-accent">
      <div className="mx-auto max-w-[80rem] px-5 pb-10 pt-6">
        <h2 className="mb-6 text-center text-title-lg font-bold text-ink">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {CATS.map((c) => (
            <Link
              key={c.label}
              href={themeHref(c.category)}
              className="group text-center"
            >
              <div className="flex items-center justify-center rounded-xl bg-[#fffdf6] py-5 shadow-sm transition-transform group-hover:-translate-y-1">
                {c.icon}
              </div>
              <div className="mt-2 text-body-md font-bold text-[#3a2f13]">
                {c.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
