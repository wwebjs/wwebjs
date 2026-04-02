'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import type { Root } from 'fumadocs-core/page-tree'

import type { PageTreeNode } from '@/lib/page-tree'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { DocsSwitcher } from './section-switcher'
import { SidebarNodes } from './tree'

export function GuideSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: Root }) {
  const pathname = usePathname()
  const [pendingPath, setPendingPath] = React.useState<string | null>(null)

  React.useEffect(() => {
    setPendingPath(null)
  }, [pathname])

  const activePath = pendingPath ?? pathname

  return (
    <Sidebar
      className="sticky top-[var(--header-height)] z-30 hidden h-[calc(var(--content-height)-110px)] overscroll-none bg-transparent [--sidebar-menu-width:calc(var(--spacing)*56+10px)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-(--top-spacing) shrink-0" />
      <div className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent lg:flex" />
      <div className="mx-auto w-(--sidebar-menu-width) translate-x-2.5 shrink-0 px-2 pt-6 lg:pt-8 pb-2">
        <DocsSwitcher />
      </div>
      <SidebarContent className="relative z-20 mx-auto w-(--sidebar-menu-width) translate-x-2.5 overflow-x-hidden overflow-y-auto px-2 select-none no-scrollbar [mask-image:linear-gradient(to_bottom,transparent_0%,black_16px,black_calc(100%-30px),transparent_100%)]">
        <SidebarGroup className="pt-[18px] px-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-[3px]">
              <SidebarNodes
                nodes={tree.children as PageTreeNode[]}
                activePath={activePath}
                onNavigate={setPendingPath}
                section
              />
              <div className="h-[30px] shrink-0" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
