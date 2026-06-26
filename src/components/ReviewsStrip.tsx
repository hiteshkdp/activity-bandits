import { REVIEWS } from "@/data/reviews";

/**
 * Slim auto-scrolling band of customer reviews, shown under the hero.
 * The track holds two copies of the reviews so the loop is seamless; it pauses
 * on hover and respects reduced-motion (see globals.css .marquee-track).
 */
export function ReviewsStrip() {
  if (REVIEWS.length === 0) return null;
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section
      aria-label="Customer reviews"
      className="overflow-hidden border-b border-hairline bg-surface py-3"
    >
      <div className="marquee-track gap-3">
        {loop.map((r, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2.5 rounded-pill border border-hairline bg-canvas px-4 py-2"
          >
            <span aria-hidden className="text-[0.8rem] text-accent">
              {"★".repeat(r.rating ?? 5)}
            </span>
            <span className="whitespace-nowrap text-body-sm text-body">
              &ldquo;{r.quote}&rdquo;
            </span>
            <span className="whitespace-nowrap text-caption font-semibold text-muted">
              — {r.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
