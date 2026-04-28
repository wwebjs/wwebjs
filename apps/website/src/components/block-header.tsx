'use client'

import type { ReactNode } from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCopyFeedback } from '@/hooks/use-copy-feedback'

type Props = {
  icon: ReactNode
  children: ReactNode
  className?: string
  copyValue?: string
  onCopy?: () => void
}

export function CodeBlockHeader({ icon, children, className, copyValue, onCopy }: Props) {
  const { hasCopied, copy, trigger } = useCopyFeedback()
  const hasCopyAction = copyValue !== undefined || onCopy !== undefined

  const handleCopy = async () => {
    if (onCopy) {
      onCopy()
      trigger()
    } else if (copyValue !== undefined) {
      await copy(copyValue)
    }
  }

  return (
    <div className={cn('flex items-center gap-2 border-b border-border/50 px-4 py-2.5', className)}>
      <div className="flex size-4 items-center justify-center rounded-[3px] bg-foreground opacity-70">
        {icon}
      </div>
      {children}
      {hasCopyAction && (
        <Button
          data-slot="copy-button"
          size="icon"
          variant="ghost"
          className="ml-auto size-8 opacity-70 hover:opacity-100 focus-visible:opacity-100"
          onClick={handleCopy}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <IconCheck /> : <IconCopy />}
        </Button>
      )}
    </div>
  )
}
