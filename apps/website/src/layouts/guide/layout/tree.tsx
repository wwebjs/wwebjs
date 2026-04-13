'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { PageTreeFolder, PageTreeNode, PageTreePage } from '@/lib/page-tree'
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { hasActivePage } from './utils'

function FolderIndexLink({
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

function FolderCollapsible({
  folder,
  activePath,
  onNavigate,
  depth,
}: {
  folder: PageTreeFolder
  activePath: string
  onNavigate: (url: string) => void
  depth: number
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
        <ChevronDown
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
          <SidebarNodes
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

export function SidebarNodes({
  nodes,
  activePath,
  onNavigate,
  depth = 0,
  section = false,
}: {
  nodes: PageTreeNode[]
  activePath: string
  onNavigate: (url: string) => void
  depth?: number
  section?: boolean
}) {
  return (
    <>
      {nodes.map((node, i) => {
        if (node.type === 'separator') {
          return (
            <SidebarGroupLabel key={i} className="mt-4 text-xs font-medium text-muted-foreground">
              {node.name as string}
            </SidebarGroupLabel>
          )
        }

        if (node.type === 'page') {
          const page = node as PageTreePage
          const isActive = activePath === page.url
          if (depth > 0) {
            return (
              <SidebarMenuSubItem key={page.url}>
                <SidebarMenuSubButton
                  render={<Link href={page.url} onClick={() => onNavigate(page.url)} />}
                  isActive={isActive}
                  className={cn(
                    'min-h-[30px] h-auto py-1 text-[0.8rem] font-medium',
                    isActive ? 'bg-accent! text-accent-foreground!' : 'hover:bg-accent/50!'
                  )}
                >
                  {page.icon && (
                    <span className="shrink-0 [&_svg]:size-3.5">
                      {page.icon as React.ReactNode}
                    </span>
                  )}
                  {page.name as string}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )
          }
          return (
            <SidebarMenuItem key={page.url}>
              <SidebarMenuButton
                render={<Link href={page.url} onClick={() => onNavigate(page.url)} />}
                isActive={isActive}
                className={cn(
                  'relative min-h-[30px] h-auto py-1 w-full text-[0.8rem] font-medium',
                  isActive ? 'bg-accent! text-accent-foreground!' : 'hover:bg-accent/50!'
                )}
              >
                {page.icon && (
                  <span className="shrink-0 [&_svg]:size-3.5">{page.icon as React.ReactNode}</span>
                )}
                {page.name as string}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }

        if (node.type === 'folder') {
          const folder = node as PageTreeFolder
          if (section) {
            return (
              <React.Fragment key={folder.$id ?? i}>
                <SidebarGroupLabel className="mt-4 text-xs font-medium text-muted-foreground">
                  {folder.name as string}
                </SidebarGroupLabel>
                {folder.index && (
                  <FolderIndexLink
                    index={folder.index}
                    activePath={activePath}
                    onNavigate={onNavigate}
                    depth={0}
                  />
                )}
                <SidebarNodes
                  nodes={folder.children as PageTreeNode[]}
                  activePath={activePath}
                  onNavigate={onNavigate}
                  depth={0}
                />
              </React.Fragment>
            )
          }
          return (
            <FolderCollapsible
              key={folder.$id ?? i}
              folder={folder}
              activePath={activePath}
              onNavigate={onNavigate}
              depth={depth}
            />
          )
        }

        return null
      })}
    </>
  )
}
