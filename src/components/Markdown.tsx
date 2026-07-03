import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useEffect, useRef, useState } from "react";

let mermaidLoadPromise: Promise<any> | null = null;

function loadMermaid(): Promise<any> {
  if (mermaidLoadPromise) return mermaidLoadPromise;
  if ((window as any).mermaid) {
    mermaidLoadPromise = Promise.resolve((window as any).mermaid);
    return mermaidLoadPromise;
  }
  mermaidLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
    script.onload = () => {
      const m = (window as any).mermaid;
      m.initialize({ startOnLoad: false, theme: "default" });
      resolve(m);
    };
    script.onerror = () => reject(new Error("Failed to load mermaid"));
    document.head.appendChild(script);
  });
  return mermaidLoadPromise;
}

/**
 * Normalize streaming markdown:
 * - Ensure headings always start on a new line
 * - Collapse excessive blank lines
 */
function normalizeMarkdown(raw: string): string {
  return raw
    .replace(/([^\n])(\n?)(#{1,6}\s)/g, "$1\n\n$3")
    .replace(/\n{3,}/g, "\n\n");
}

function MermaidCodeBlock({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
    loadMermaid()
      .then(async (m) => {
        if (cancelled) return;
        const { svg } = await m.render(id, code);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      });
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return <pre style={{ color: "red" }}>Mermaid render error: {error}</pre>;
  }

  return (
    <div
      ref={containerRef}
      className="rounded-lg border bg-white p-4 text-center"
    />
  );
}

export function Markdown({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const normalized = normalizeMarkdown(content);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : null;
            const codeString = String(children).replace(/\n$/, "");

            if (language === "mermaid") {
              return <MermaidCodeBlock code={codeString} />;
            }

            if (!className) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
