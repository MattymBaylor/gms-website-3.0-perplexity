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
      <h2 className="relative mt-20 mb-6 text-h2 font-semibold text-ink scroll-mt-24 pl-5 border-l-2 border-accent/70">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-h3 font-semibold text-ink mt-12 mb-4 scroll-mt-24">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-ink/85 leading-[1.8] mb-6 text-[1.0625rem]">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link href={href ?? '#'} className="link-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 list-disc space-y-3 pl-6 text-ink/85 leading-[1.75] marker:text-accent/60">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-6 text-ink/85 leading-[1.75] marker:text-accent/80 marker:font-semibold">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-[1.75] pl-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-card border-l-4 border-accent bg-bg-card/40 px-6 py-5 text-lead text-ink italic">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="my-16 border-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    ),
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
