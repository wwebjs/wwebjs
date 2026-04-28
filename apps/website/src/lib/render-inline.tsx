import type { ReactNode } from 'react'
import Link from 'next/link'
import { IconExternalLink } from '@tabler/icons-react'

const TOKEN_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g

// TODO: Implement fumadocs flavor markdown

export function renderInline(text: string): ReactNode[] {
  const parts = text.split(TOKEN_RE)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    if (
      (part.startsWith('*') && part.endsWith('*')) ||
      (part.startsWith('_') && part.endsWith('_'))
    )
      return <em key={i}>{part.slice(1, -1)}</em>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      const isExternal = /^https?:\/\//.test(href)
      if (isExternal)
        return (
          <a
            key={i}
            href={href}
            className="inline-flex items-center gap-0.5 underline underline-offset-4 hover:text-foreground/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
            <IconExternalLink className="size-3" />
          </a>
        )
      return (
        <Link key={i} href={href} className="underline underline-offset-4 hover:text-foreground/80">
          {label}
        </Link>
      )
    }
    return part
  })
}
