/**
 * Compact, scalable SVG mark for the nav and footer.
 * Designed to be legible at 24px and elegant at 200px.
 * Uses `currentColor` so it adapts to text color.
 *
 * Concept: stylized "GM" monogram inside a rounded square — the square
 * suggests a contained system; the cyan accent dot signals a live signal.
 */
export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="27" height="27" rx="7" />
      <path d="M11 21V13a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
      <path d="M15 17a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
      <path d="M19 17a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
      <circle cx="24.5" cy="8" r="1.6" fill="#00d4ff" stroke="none" />
    </svg>
  );
}

export function Logo({
  className = '',
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showMark && <LogoMark className="h-[18px] w-[18px] text-ink" />}
      <span className="text-[15px] font-semibold tracking-tight">
        GrowthMindset<span className="text-accent">.ai</span>
      </span>
    </div>
  );
}
