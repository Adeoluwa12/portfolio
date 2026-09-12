import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogPost } from "@/lib/api";
import MarkdownBody from "@/components/MarkdownBody";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getBlogPost(slug)
      .then((data) => {
        setPost(data);
        document.title = `${data.title} | Oluwaferanmi David Adeoye`;
      })
      .catch(() => navigate("/blog", { replace: true }))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 flex items-start">
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-textDim font-mono text-sm">Loading…</p>
        </div>
      </main>
    );
  }

  if (!post) return null;

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
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 font-mono text-xs text-textDim hover:text-accent transition-colors mb-10"
        >
          ← Back to blog
        </Link>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-56 sm:h-72 object-cover rounded-xl border border-hairline mb-8"
          />
        )}

        {post.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag: string) => (
              <li key={tag} className="font-mono text-xs px-2.5 py-1 rounded-md bg-surfaceAlt border border-hairline text-textDim">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text leading-snug mb-3">
          {post.title}
        </h1>

        {dateStr && (
          <p className="font-mono text-xs text-textDim mb-8">{dateStr}</p>
        )}

        {post.description && (
          <p className="text-textDim text-base leading-relaxed border-l-2 border-accent pl-4 mb-8">
            {post.description}
          </p>
        )}

        <hr className="border-hairline mb-8" />

        {post.body ? (
          <MarkdownBody content={post.body} />
        ) : (
          <p className="text-textDim italic text-sm">No content yet.</p>
        )}
      </div>
    </main>
  );
}
