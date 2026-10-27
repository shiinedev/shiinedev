import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs">
      <p className="text-link">Copyright © {new Date().getFullYear()} Abdihakim.</p>
      <div className="flex gap-6 text-muted-foreground">
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
        <a href="/#projects" className="hover:text-foreground">
          Projects
        </a>
        <a href="/#contact" className="hover:text-foreground">
          Contact
        </a>
      </div>
    </footer>
  );
}