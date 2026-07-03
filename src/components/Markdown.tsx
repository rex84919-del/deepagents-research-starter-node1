import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({ startOnLoad: true, theme: "default" });

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
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    if (!containerRef.current) return;
    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(idRef.current, code);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre style="color:red;">Mermaid render error: ${String(err)}</pre>`;
        }
      }
    };
    renderDiagram();
  }, [code]);

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
