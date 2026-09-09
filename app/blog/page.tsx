import { getBlogPosts } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Oluwaferanmi David Adeoye",
  description: "Thoughts on cloud security, Azure, Zero Trust, and DevSecOps.",
};

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await getBlogPosts();
  } catch {
    posts = [];
  }

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <p className="section-label">Writing</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text mb-4">
          Blog
        </h1>
        <p className="text-textDim text-base leading-relaxed mb-14">
          Thoughts on cloud security, Azure, Zero Trust, and DevSecOps.
        </p>

        {posts.length === 0 ? (
          <p className="text-textDim font-mono text-sm">No posts yet — check back soon.</p>
        ) : (
          <ul className="flex flex-col gap-px border border-hairline rounded-xl overflow-hidden">
            {posts.map((post: any, i: number) => (
              <li key={post._id || post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 py-5 bg-surface hover:bg-surfaceAlt transition-colors ${
                    i !== 0 ? "border-t border-hairline" : ""
                  }`}
                >
                  {/* date */}
                  <span className="font-mono text-xs text-textDim shrink-0 w-24">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>

                  {/* title + description */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-text group-hover:text-accent transition-colors truncate">
                      {post.title}
                    </p>
                    {post.description && (
                      <p className="text-textDim text-sm mt-0.5 line-clamp-1">
                        {post.description}
                      </p>
                    )}
                  </div>

                  {/* tags */}
                  {post.tags?.length > 0 && (
                    <ul className="hidden sm:flex flex-wrap gap-1.5 shrink-0">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <li
                          key={tag}
                          className="font-mono text-xs px-2 py-0.5 rounded bg-surfaceAlt border border-hairline text-textDim"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
