import { BOOKS } from "@/data/books";

/** Flat illustration of a child reading a book. */
function KidReading() {
  return (
    <svg viewBox="0 0 200 210" className="h-auto w-44 sm:w-56 lg:w-64" role="img" aria-label="A child reading a book">
      {/* legs / body */}
      <path d="M54 158c0-26 20-40 46-40s46 14 46 40v42H54z" fill="#f0526b" />
      <path d="M60 150h72M58 164h76M58 178h76" stroke="#d33f56" strokeWidth="5" strokeLinecap="round" opacity=".4" />
      {/* head */}
      <circle cx="100" cy="78" r="38" fill="#e0a173" />
      <path d="M62 74c0-24 17-40 38-40s38 16 38 40c0 0-10-13-38-13s-38 13-38 13z" fill="#2e2019" />
      <circle cx="66" cy="52" r="12" fill="#2e2019" />
      <circle cx="86" cy="40" r="13" fill="#2e2019" />
      <circle cx="108" cy="40" r="13" fill="#2e2019" />
      <circle cx="130" cy="52" r="12" fill="#2e2019" />
      <circle cx="86" cy="80" r="4" fill="#2e2019" />
      <circle cx="114" cy="80" r="4" fill="#2e2019" />
      <circle cx="76" cy="92" r="6.5" fill="#e8785f" opacity=".45" />
      <circle cx="124" cy="92" r="6.5" fill="#e8785f" opacity=".45" />
      <path d="M90 94q10 8 20 0" stroke="#2e2019" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* book */}
      <path d="M40 148c18-8 40-8 60 3 20-11 42-11 60-3v44c-18-8-40-8-60 3-20-11-42-11-60-3z" fill="#2f89c5" />
      <path d="M100 151v44" stroke="#1c6591" strokeWidth="3.5" />
      <path d="M50 158c13-4 29-4 41 4M50 168c13-4 29-4 41 4M109 162c12-8 28-8 41-4M109 172c12-8 28-8 41-4" stroke="#cfe9fa" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Bird() {
  return (
    <svg viewBox="0 0 70 54" className="w-12 sm:w-16" role="img" aria-label="A little bird">
      <ellipse cx="30" cy="30" rx="20" ry="14" fill="#fbc02d" />
      <circle cx="47" cy="22" r="11" fill="#fbc02d" />
      <path d="M56 21l11-4-7 9z" fill="#f97316" />
      <circle cx="49" cy="20" r="2.2" fill="#2e2019" />
      <path d="M22 22q12-13 24-3-12 10-24 3z" fill="#14b3c2" />
      <path d="M10 27q-9 3-5 9" stroke="#14b3c2" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Plants() {
  return (
    <svg viewBox="0 0 90 70" className="w-16 sm:w-24" role="img" aria-label="Plants">
      <path d="M26 68V34" stroke="#2f8f5b" strokeWidth="5" strokeLinecap="round" />
      <path d="M26 34c0-14 7-24 7-24s7 10 7 24-7 16-7 16-7-2-7-16z" fill="#2f8f5b" />
      <path d="M64 68V38" stroke="#14b3c2" strokeWidth="5" strokeLinecap="round" />
      <path d="M64 38c0-13 6-21 6-21s6 8 6 21-6 15-6 15-6-2-6-15z" fill="#14b3c2" />
      <path d="M10 68q-2-16 8-22M80 68q3-14-6-20" stroke="#7bbf5a" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-surface-soft">
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-6 px-5 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] lg:gap-10">
        {/* Illustration */}
        <div className="flex justify-center lg:justify-start">
          <KidReading />
        </div>

        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-display-md font-bold leading-[1.02] text-action sm:text-display-lg">
            Activity Bandits
          </h1>
          <p className="mt-3 text-title-md font-bold text-ink sm:text-title-lg">
            Books that keep curious kids busy!
          </p>
          <p className="mx-auto mt-2 max-w-[32rem] text-body-md text-body lg:mx-0">
            Explore our collection of children&apos;s activity books.
          </p>
          <a
            href="#browse"
            className="mt-6 inline-block rounded-pill bg-action px-8 py-3 text-button font-bold text-on-action shadow-sm transition-colors hover:bg-action-strong"
          >
            Shop Now
          </a>
          <p className="mt-3 text-caption font-semibold text-muted">
            {BOOKS.length} books · ships from your local Amazon · ages 3–12
          </p>
        </div>

        {/* Decorations */}
        <div className="pointer-events-none absolute right-4 top-6 hidden sm:block">
          <Bird />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-5 hidden sm:block">
          <Plants />
        </div>
      </div>
    </section>
  );
}
