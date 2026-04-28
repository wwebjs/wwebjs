'use client'

import React from 'react'
import Link from 'next/link'
import { IconChevronDown } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import type { PageTreeFolder, PageTreeNode } from '@/lib/page-tree'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { hasActivePage } from './utils'

export function FolderIndexLink({
  index,
  activePath,
  onNavigate,
  depth,
}: {
  index: NonNullable<PageTreeFolder['index']>
  activePath: string
  onNavigate: (url: string) => void
  depth: number
}) {
  const isActive = activePath === index.url
  const className = cn(
    'min-h-[30px] h-auto py-1 text-[0.8rem] font-medium',
    isActive ? 'bg-accent! text-accent-foreground!' : 'hover:bg-accent/50!'
  )
  const linkEl = <Link href={index.url} onClick={() => onNavigate(index.url)} />

  if (depth > 0) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton render={linkEl} isActive={isActive} className={className}>
          {index.name as string}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={linkEl}
        isActive={isActive}
        className={cn('relative w-full', className)}
      >
        {index.name as string}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function FolderCollapsible({
  folder,
  activePath,
  onNavigate,
  depth,
  SidebarNodesComponent,
}: {
  folder: PageTreeFolder
  activePath: string
  onNavigate: (url: string) => void
  depth: number
  SidebarNodesComponent: React.ComponentType<{
    nodes: PageTreeNode[]
    activePath: string
    onNavigate: (url: string) => void
    depth?: number
  }>
}) {
  const children = folder.children as PageTreeNode[]
  const [open, setOpen] = React.useState(
    () => (folder.defaultOpen ?? false) || hasActivePage(children, activePath)
  )

  return (
    <SidebarMenuItem>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex min-h-[30px] h-auto w-full items-center justify-between rounded-md px-2 py-1 text-[0.8rem] font-medium text-foreground hover:bg-accent/50 transition-colors"
      >
        <span>{folder.name as string}</span>
        <IconChevronDown
          className={`size-3.5 shrink-0 transition-transform duration-200 -rotate-90${open ? ' rotate-0' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <SidebarMenuSub className="gap-[3px] mr-0 pr-0 border-l-0 relative before:absolute before:left-0 before:top-[6px] before:bottom-[2px] before:w-px before:bg-border">
          {folder.index && (
            <FolderIndexLink
              index={folder.index}
              activePath={activePath}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          )}
          <SidebarNodesComponent
            nodes={children}
            activePath={activePath}
            onNavigate={onNavigate}
            depth={depth + 1}
          />
        </SidebarMenuSub>
      </div>
    </SidebarMenuItem>
  )
}
