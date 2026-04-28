'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCopyFeedback } from '@/hooks/use-copy-feedback'

type Props = {
  preview: ReactNode
  highlightedCode: string
  rawCode: string
  align?: 'center' | 'start' | 'end'
  className?: string
}

export function CodePreviewClient({
  preview,
  highlightedCode,
  rawCode,
  align = 'center',
  className,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const { hasCopied, copy } = useCopyFeedback()

  return (
    <div
      className={cn(
        'mt-6 overflow-hidden rounded-xl border border-border bg-code text-code-foreground',
        className
      )}
    >
      <div
        className={cn(
          'flex min-h-52 w-full items-center border-b border-border/50 bg-background p-6',
          align === 'center' && 'justify-center',
          align === 'start' && 'justify-start',
          align === 'end' && 'justify-end'
        )}
      >
        {preview}
      </div>
      <div className={cn('relative overflow-hidden', !expanded && 'max-h-36')}>
        {/* HTML is Shiki output - sanitized at highlight time, not user input */}
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        {!expanded && (
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-code to-transparent pb-4">
            <Button type="button" variant="outline" size="sm" onClick={() => setExpanded(true)}>
              View Code
            </Button>
          </div>
        )}
        {expanded && (
          <Button
            data-slot="copy-button"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
            onClick={() => copy(rawCode)}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? <IconCheck /> : <IconCopy />}
          </Button>
        )}
      </div>
    </div>
  )
}
