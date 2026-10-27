import Link from "next/link";
import { ArrowLeft, FolderSearch } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 py-16">
      <section className="w-full rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <FolderSearch className="size-6" aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-medium text-muted-foreground">
          404 · Project not found
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          We couldn’t find that project
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          The project may have been moved or the link may be incorrect.
        </p>

        <Link
          href="/#projects"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>
      </section>
    </main>
  );
}