import Link from "next/link"

export function SectionHeader({
  label,
  title,
  link,
  href,
}: {
  label: string
  title: string
  link?: string
  href?: string
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] tracking-widest whitespace-nowrap text-muted-foreground uppercase">
          {label}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {title && (
        <div className="flex items-baseline justify-between">
          <h2 className="text-[16px] font-medium">{title}</h2>
          {link && href && (
            <Link
              href={href}
              className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
