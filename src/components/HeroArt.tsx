/**
 * Decorative hero artwork. Currently a travel "route" doodle recreated as an SVG.
 * Add more illustrations here as the brand grows (or swap in real image files
 * dropped into /public/decor and referenced with <img src="/decor/..." />).
 */
export function HeroArt() {
  const BLUE = "#2846c9";
  return (
    <div className="flex justify-center" aria-hidden>
      <svg viewBox="0 0 320 340" className="h-auto w-56 sm:w-72 lg:w-80">
        {/* dotted travel route */}
        <path
          d="M56 306 C 56 262 104 274 96 238 C 88 202 40 214 64 176 C 86 146 132 174 152 148 C 170 126 140 104 166 90 C 192 78 212 104 196 124 C 186 137 222 140 242 118 C 256 103 262 84 270 70"
          fill="none"
          stroke={BLUE}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="0.1 13"
        />
        {/* location pin */}
        <path
          d="M56 336c-11-16-19-24-19-34a19 19 0 1138 0c0 10-8 18-19 34z"
          fill={BLUE}
        />
        <circle cx="56" cy="302" r="7" fill="#fff" />
        {/* aeroplane */}
        <g transform="translate(252 44) rotate(34)">
          <path
            d="M2 15 L30 5 C34 4 36 7 33 10 L20 15 L30 27 L25 28 L12 18 L6 25 L3 24 L6 15 L0 16 Z"
            fill={BLUE}
          />
        </g>
      </svg>
    </div>
  );
}
