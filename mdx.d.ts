// Lets TypeScript treat .mdx imports as React components,
// which the app/blog/[slug] dynamic import relies on.
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
