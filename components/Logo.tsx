/**
 * Official growthmindset.ai brand mark.
 * Uses `currentColor` so the SVG adapts to the surrounding text color
 * (white on the dark site, dark when used on light surfaces).
 */
export function LogoMark({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 366.32 387.8"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="255.19 280.02 196.93 387.8 308.06 387.8 366.32 280.02 255.19 280.02" />
      <path d="M173.18,172.25l-116.51,215.55h111.13l63.66-117.78c23.86-44.15-8.11-97.76-58.29-97.76" />
      <path d="M174.18,116.51h58.84L183.78,0,0,116.51h63.04L10.65,213.44c-23.86,44.15,8.11,97.76,58.29,97.76l105.24-194.7Z" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[18px] w-auto text-ink" />
      <span className="text-[15px] font-semibold tracking-tight">
        growthmindset<span className="text-accent">.ai</span>
      </span>
    </div>
  );
}
