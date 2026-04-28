'use client'

import * as React from 'react'
import { IconX } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/use-local-storage'

type BannerProps = React.ComponentProps<'div'> & {
  id?: string
}

export function Banner({ id, className, children, ...props }: BannerProps) {
  const [dismissed, setDismissed] = useLocalStorage(id ? `banner-${id}` : '', false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const visible = id ? !dismissed : true
  if (!visible) return null

  return (
    <div
      className={cn(
        'sticky top-0 z-40 flex items-center justify-center px-4 py-2 text-center text-sm font-medium bg-red-900 text-white',
        className
      )}
      {...props}
    >
      {children}
      {id && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close"
          className="absolute end-2 top-1/2 -translate-y-1/2 size-7 opacity-50 hover:bg-transparent hover:opacity-100"
          onClick={() => setDismissed(true)}
        >
          <IconX />
        </Button>
      )}
    </div>
  )
}
