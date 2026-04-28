'use client'

import { useState, type ComponentType } from 'react'
import Link from 'next/link'
import { IconCheck, IconSelector } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export type SwitcherItem = {
  value: string
  label: string
  description?: string
  icon?: ComponentType<{ className?: string }>
  href?: string
}

type SidebarSwitcherProps = {
  items: SwitcherItem[]
  value: string
  onValueChange?: (value: string) => void
}

const itemClassName =
  'flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent hover:text-accent-foreground'

function SwitcherItemContent({ item, isActive }: { item: SwitcherItem; isActive: boolean }) {
  return (
    <>
      <div
        className={cn(
          'grid min-w-0 flex-1 items-start gap-x-2',
          item.icon ? 'grid-cols-[18px_1fr]' : 'grid-cols-1'
        )}
      >
        {item.icon && <item.icon className="row-span-2 size-[18px] shrink-0" />}
        <p className="text-sm font-medium leading-none">{item.label}</p>
        {item.description && (
          <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">{item.description}</p>
        )}
      </div>
      <IconCheck className={cn('size-3.5 shrink-0 text-primary', !isActive && 'invisible')} />
    </>
  )
}

export function SidebarSwitcher({ items, value, onValueChange }: SidebarSwitcherProps) {
  const [open, setOpen] = useState(false)
  const selected = items.find(item => item.value === value) ?? items[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-full items-center gap-2 rounded-lg bg-secondary p-2 text-start text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-medium">
            {selected?.icon && <selected.icon className="size-[18px] shrink-0" />}
            {selected?.label}
          </p>
        </div>
        <IconSelector className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width)">
        {items.map(item => {
          const isActive = item.value === value
          if (item.href) {
            return (
              <Link
                key={item.value}
                href={item.href}
                onClick={() => setOpen(false)}
                className={itemClassName}
              >
                <SwitcherItemContent item={item} isActive={isActive} />
              </Link>
            )
          }
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onValueChange?.(item.value)
                setOpen(false)
              }}
              className={cn(itemClassName, 'w-full text-left')}
            >
              <SwitcherItemContent item={item} isActive={isActive} />
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
