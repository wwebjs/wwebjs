'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <div className={cn('relative', className)} {...props}>
      <div className="absolute top-1.5 right-9 z-10 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 rounded-md px-2 text-muted-foreground"
          onClick={() => setIsOpened(!isOpened)}
        >
          {isOpened ? 'Collapse' : 'Expand'}
        </Button>
        <Separator orientation="vertical" className="mx-1.5 h-4!" />
      </div>
      <div
        className={cn(
          'relative mt-6 overflow-hidden [&>figure]:mt-0',
          !isOpened && 'max-h-64 [content-visibility:auto]'
        )}
      >
        {children}
      </div>
      {!isOpened && (
        <Button
          type="button"
          variant="ghost"
          className="absolute inset-x-0 -bottom-2 h-20 w-full rounded-b-lg rounded-t-none bg-gradient-to-b from-code/70 to-code text-sm text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
          onClick={() => setIsOpened(true)}
        >
          Expand
        </Button>
      )}
    </div>
  )
}
