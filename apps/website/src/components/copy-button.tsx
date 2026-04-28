'use client'

import * as React from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCopyFeedback } from '@/hooks/use-copy-feedback'

export function CopyButton({
  value,
  className,
  variant = 'ghost',
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
  src?: string
}) {
  const { hasCopied, copy } = useCopyFeedback()

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant={variant}
      className={cn(
        'absolute top-2 right-2 z-10 size-8 bg-code opacity-70 hover:opacity-100 focus-visible:opacity-100',
        className
      )}
      onClick={() => copy(value)}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <IconCheck /> : <IconCopy />}
    </Button>
  )
}
