import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// Keep your Post type and parseFrontMatter function.

// Markdown-file-backed blog content, in the spirit of Fumapress content collections.
// Drop a new .md file in src/content/blog/ with the same front matter block and it
// appears on the blog automatically (file name becomes the URL slug).

export type Post = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    isoDate: string;
    readTime: string;
    category: string;
    content: string;
  };
  

  
  function parseFrontMatter(raw: string) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
    if (!match) return { data: {} as Record<string, string>, content: raw.trim() };
  
    const data: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  
    return { data, content: raw.slice(match[0].length).trim() };
  }
  
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  
export async function getPosts(): Promise<Post[]> {
  const blogDir = path.join(process.cwd(), "lib/content");
  const filenames = (await readdir(blogDir)).filter((file) =>
    file.endsWith(".md"),
  );

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const raw = await readFile(path.join(blogDir, filename), "utf8");
      const { data, content } = parseFrontMatter(raw);
      const slug = filename.replace(/\.md$/, "");
      const parsed = new Date(`${data.date ?? "1970-01-01"}T00:00:00Z`);

      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.description ?? "",
        date: dateFormatter.format(parsed),
        isoDate: parsed.toISOString(),
        readTime: data.readTime ?? "5 min read",
        category: data.category ?? "Notes",
        content,
      };
    }),
  );

  return posts.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}