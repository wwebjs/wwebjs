'use client'

import Link from 'next/link'
import { Menu } from '@base-ui/react/menu'

import { BreadcrumbEllipsis, BreadcrumbItem } from '@/components/ui/breadcrumb'
import type { CrumbSegment } from '@/lib/page-tree'

export function EllipsisDropdown({ hidden }: { hidden: CrumbSegment[] }) {
  return (
    <BreadcrumbItem>
      <Menu.Root>
        <Menu.Trigger className="flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground">
          <BreadcrumbEllipsis />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="start" sideOffset={6}>
            <Menu.Popup className="z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md">
              {hidden.map((seg, i) => {
                if (seg.type === 'link') {
                  return (
                    <Menu.Item
                      key={seg.url}
                      className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-popover-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      render={<Link href={seg.url} />}
                    >
                      {seg.name}
                    </Menu.Item>
                  )
                }
                return (
                  <div
                    key={'name' in seg ? seg.name : `item-${i}`}
                    className="px-2 py-1.5 text-sm text-muted-foreground"
                  >
                    {'name' in seg ? seg.name : ''}
                  </div>
                )
              })}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </BreadcrumbItem>
  )
}
