/** Compact star rating for social proof. Renders nothing if no rating. */
export function Stars({ rating }: { rating?: number }) {
  if (!rating) return null;

  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <span
      className="inline-flex items-center gap-1 text-primary"
      aria-label={`${rating} out of 5 stars`}
    >
      <span className="text-[0.95em] leading-none" aria-hidden>
        {"★".repeat(full)}
        {half ? "½" : ""}
      </span>
      <span className="font-number text-body-sm text-muted-strong tabular-nums">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
