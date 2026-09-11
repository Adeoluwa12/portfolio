import { getBlogPost, getBlogPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import MarkdownBody from "@/components/MarkdownBody";

type Props = { params: { slug: string } };

// Allow slugs not known at build time to be rendered on-demand
export const dynamicParams = true;
// Always SSR — never serve a stale static snapshot
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    return {
      title: `${post.title} | Oluwaferanmi David Adeoye`,
      description: post.description || undefined,
      openGraph: post.imageUrl ? { images: [post.imageUrl] } : undefined,
    };
  } catch {
    return { title: "Post not found" };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: any;
  try {
    post = await getBlogPost(params.slug);
  } catch {
    notFound();
  }

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 font-mono text-xs text-textDim hover:text-accent transition-colors mb-10"
        >
          ← Back to blog
        </Link>

        {/* cover image */}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-56 sm:h-72 object-cover rounded-xl border border-hairline mb-8"
          />
        )}

        {/* tags */}
        {post.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag: string) => (
              <li
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-surfaceAlt border border-hairline text-textDim"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* heading */}
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text leading-snug mb-3">
          {post.title}
        </h1>

        {/* meta row */}
        {dateStr && (
          <p className="font-mono text-xs text-textDim mb-8">{dateStr}</p>
        )}

        {/* short description */}
        {post.description && (
          <p className="text-textDim text-base leading-relaxed border-l-2 border-accent pl-4 mb-8">
            {post.description}
          </p>
        )}

        {/* divider */}
        <hr className="border-hairline mb-8" />

        {/* body */}
        {post.body ? (
          <MarkdownBody content={post.body} />
        ) : (
          <p className="text-textDim italic text-sm">No content yet.</p>
        )}
      </div>
    </main>
  );
}
