import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { DocsSidebar } from '@/layouts/docs/layout'

export function DocsShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto flex w-full max-w-[1560px] flex-1 flex-col px-2"
      style={{ '--content-height': 'calc(100dvh - var(--header-height))' } as React.CSSProperties}
    >
      <SidebarProvider
        className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)]"
        style={{ '--sidebar-width': 'calc(var(--spacing) * 72)' } as React.CSSProperties}
      >
        <DocsSidebar />
        <div className="h-full w-full">{children}</div>
      </SidebarProvider>
    </div>
  )
}
