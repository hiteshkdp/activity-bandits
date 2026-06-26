/**
 * Compact star rating for social proof. Renders nothing if no rating.
 * Uses an overlay technique so fractional ratings (e.g. 4.6) fill precisely.
 */
export function Stars({
  rating,
  className = "",
}: {
  rating?: number;
  className?: string;
}) {
  if (!rating) return null;
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      <span className="relative inline-block text-[0.95em] leading-none" aria-hidden>
        <span className="text-hairline">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden whitespace-nowrap text-accent"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span className="text-body-sm font-bold text-muted">{rating.toFixed(1)}</span>
    </span>
  );
}
