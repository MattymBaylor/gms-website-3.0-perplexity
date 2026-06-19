import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import type { PostMeta } from '@/lib/blog';

/**
 * Thumbnail for a blog card. Renders the post's hero image when present,
 * otherwise a branded placeholder so heroless posts (Peterman publishes
 * daily without art) never render as an empty panel. Must sit inside a
 * `relative`, sized parent — it fills it.
 */
export function PostThumb({
  post,
  sizes,
  priority,
}: {
  post: PostMeta;
  sizes?: string;
  priority?: boolean;
}) {
  if (post.hero) {
    return (
      <Image
        src={post.hero}
        alt={post.heroAlt || ''}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-bg-elevated">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute bottom-3 left-3 h-1.5 w-10 rounded-full bg-accent/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105">
        <Sparkles className="text-accent/90" size={34} strokeWidth={1.5} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-dim">
          growthmindset.ai
        </span>
      </div>
    </div>
  );
}
