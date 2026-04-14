import { Card } from "@/components/ui/card"

type Props = { content: string }

export function PostBody({ content }: Props) {
  const nodes = parse(content)
  return (
    <article className="prose-custom max-w-2xl">
      {nodes.map((node, i) => renderNode(node, i))}
    </article>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────

type Node =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; html: string }
  | { type: "code"; lang: string; code: string }
  | { type: "hr" }

// ── Parser ─────────────────────────────────────────────────────────────────

function parse(content: string): Node[] {
  const lines = content.split("\n")
  const nodes: Node[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      nodes.push({ type: "code", lang, code: codeLines.join("\n") })
      i++
      continue
    }

    // Headings
    if (line.startsWith("## ")) {
      nodes.push({ type: "h2", text: line.slice(3) })
      i++
      continue
    }
    if (line.startsWith("### ")) {
      nodes.push({ type: "h3", text: line.slice(4) })
      i++
      continue
    }

    // HR
    if (line.trim() === "---") {
      nodes.push({ type: "hr" })
      i++
      continue
    }

    // Blank line
    if (line.trim() === "") {
      i++
      continue
    }

    // Paragraph — collect consecutive non-empty, non-heading lines
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("```") &&
      lines[i].trim() !== "---"
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      nodes.push({ type: "p", html: inlineFormat(paraLines.join(" ")) })
    }
  }

  return nodes
}

// ── Inline formatter (bold, inline code, backtick) ─────────────────────────

function inlineFormat(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
}

// ── Renderer ───────────────────────────────────────────────────────────────

function renderNode(node: Node, key: number) {
  switch (node.type) {
    case "h2":
      return (
        <h2
          key={key}
          className="mt-10 mb-3 text-lg font-medium tracking-tight text-foreground"
        >
          {node.text}
        </h2>
      )

    case "h3":
      return (
        <h3
          key={key}
          className="mt-6 mb-2 text-base font-medium text-foreground"
        >
          {node.text}
        </h3>
      )

    case "p":
      return (
        <p
          key={key}
          className="mb-4 text-[14px] leading-[1.8] text-muted-foreground [&_.inline-code]:rounded-md [&_.inline-code]:bg-muted [&_.inline-code]:px-1.5 [&_.inline-code]:py-0.5 [&_.inline-code]:font-mono [&_.inline-code]:text-[12px] [&_.inline-code]:text-foreground [&_strong]:font-medium [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
      )

    case "code":
      return (
        <Card key={key} className="mb-5 overflow-hidden shadow-none">
          {node.lang && (
            <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                {node.lang}
              </span>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-border" />
                <span className="h-2 w-2 rounded-full bg-border" />
                <span className="h-2 w-2 rounded-full bg-border" />
              </div>
            </div>
          )}
          <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed">
            <code className="font-mono whitespace-pre text-foreground">
              {node.code}
            </code>
          </pre>
        </Card>
      )

    case "hr":
      return <hr key={key} className="my-8 border-border" />

    default:
      return null
  }
}
