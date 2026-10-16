import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import type { BlogPost } from "@/lib/data/types";
import { cn, formatDate } from "@/lib/utils";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow hover:shadow-lift",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <div className={cn("relative aspect-[16/9] overflow-hidden bg-sand-200", featured && "lg:aspect-auto lg:min-h-full")}>
        {isImageKey(post.imageKey) ? (
          <SafariImage
            imageKey={post.imageKey}
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:p-10")}>
        <p className="text-sm text-ink-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        <h2 className={cn("mt-2 font-semibold text-forest-900", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-ink-600">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ochre-700">
          Read article
          <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
