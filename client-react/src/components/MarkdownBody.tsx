import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display text-2xl font-semibold text-text mt-10 mb-4 leading-snug">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-xl font-semibold text-text mt-8 mb-3 leading-snug">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-lg font-semibold text-text mt-6 mb-2 leading-snug">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-display text-base font-semibold text-text mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-text text-[0.95rem] leading-relaxed mb-5">{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  em: ({ children }) => <em className="italic text-textDim">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 mb-5 space-y-1.5 text-[0.95rem] text-text">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 mb-5 space-y-1.5 text-[0.95rem] text-text">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-4 my-5 text-textDim italic text-[0.95rem] leading-relaxed">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: any) => {
    const isBlock = !props.inline;
    if (isBlock) {
      return (
        <code className={`block font-mono text-sm leading-relaxed ${className ?? ""}`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-[0.85em] bg-surfaceAlt border border-hairline rounded px-1.5 py-0.5 text-accent">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surfaceAlt border border-hairline rounded-xl px-5 py-4 overflow-x-auto mb-5 text-sm leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-hairline my-8" />,
  img: ({ src, alt }) => (
    <img src={src} alt={alt ?? ""} className="w-full rounded-xl border border-hairline my-6 object-cover" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-5">
      <table className="w-full text-sm border-collapse border border-hairline rounded-lg overflow-hidden">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surfaceAlt text-textDim font-mono text-xs uppercase tracking-wide">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-hairline">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-surfaceAlt/50 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-2.5 text-left border-b border-hairline">{children}</th>,
  td: ({ children }) => <td className="px-4 py-2.5 text-text">{children}</td>,
};

export default function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="min-w-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
