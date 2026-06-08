/**
 * The growthmindset.ai wordmark as inline text, with the ".ai" in the accent
 * color — matches the treatment in the logo. Use anywhere the brand name
 * appears as visible copy (headings, body, footer). Always lowercase.
 */
export function BrandName({ className = '' }: { className?: string }) {
  return (
    <span className={className}>
      growthmindset<span className="text-accent">.ai</span>
    </span>
  );
}
