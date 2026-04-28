import * as React from 'react'

import { cn } from '@/lib/utils'

type CalloutProps = React.ComponentProps<'div'> & {
  icon?: React.ReactNode
  title?: string
  variant?: 'default' | 'tip' | 'warning' | 'danger'
}

export function Callout({
  title,
  children,
  icon,
  className,
  variant = 'default',
  ...props
}: CalloutProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cn(
        'relative mt-6 grid w-auto grid-cols-[0_1fr] items-start gap-y-0.5 rounded-xl border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 **:[code]:border',

        // variants
        variant === 'default' && 'bg-muted/50 text-foreground border-none',

        variant === 'tip' && 'border-[#00d492] bg-[#004f3b] text-foreground',

        variant === 'warning' && 'border-yellow-500 bg-yellow-500/20 text-foreground',

        variant === 'danger' && 'border-red-500 bg-red-500/20 text-foreground',

        className
      )}
      {...props}
    >
      {icon}

      {title && (
        <div className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight">{title}</div>
      )}

      <div className="col-start-2 grid justify-items-start gap-1 text-sm opacity-80 [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  )
}
