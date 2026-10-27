import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-10 text-lg font-semibold tracking-tight text-foreground">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-5 max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        a: ({ children, href }) => (
          <a href={href} className="text-foreground underline underline-offset-4">
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-6 max-w-2xl border-l-2 border-border pl-4 text-sm italic leading-relaxed text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="mt-6 max-w-2xl overflow-x-auto rounded-xl bg-muted p-4 text-xs text-foreground">
            {children}
          </pre>
        ),
        hr: () => <hr className="mt-8 border-border" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
