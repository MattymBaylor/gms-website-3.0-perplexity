import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { ROICalculator } from '@/components/blog/ROICalculator';

/**
 * Required by @next/mdx in the App Router.
 * Maps MDX elements to the GrowthMindset design system and registers
 * custom components that articles can use inline (e.g. <ROICalculator />).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-h2 font-semibold text-ink mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-h3 font-semibold text-ink mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-ink-muted leading-relaxed mb-5">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link href={href ?? '#'} className="link-accent">
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-ink-muted">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 text-ink-muted">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-accent/60 pl-5 text-lead text-ink-muted italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-border" />,
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        width={1200}
        height={630}
        className="my-8 rounded-card"
        alt={props.alt ?? ''}
      />
    ),
    // Custom interactive components usable inside any .mdx article:
    ROICalculator,
    ...components,
  };
}
