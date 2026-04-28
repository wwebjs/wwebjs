'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { PageTreeFolder, PageTreeNode, PageTreePage } from '@/lib/page-tree'
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { FolderCollapsible, FolderIndexLink } from './tree-folder'

function PageNodeContent({ page }: { page: PageTreePage }) {
  return (
    <>
      {page.icon && (
        <span className="shrink-0 [&_svg]:size-3.5">{page.icon as React.ReactNode}</span>
      )}
      {page.name as string}
    </>
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
                  <PageNodeContent page={page} />
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
                <PageNodeContent page={page} />
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
              SidebarNodesComponent={SidebarNodes}
            />
          )
        }

        return null
      })}
    </>
  )
}
