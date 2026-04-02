'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { GUIDE_SECTIONS, getActiveSection } from '@/layouts/guide/sections'

export function DocsSwitcher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const selected = useMemo(() => getActiveSection(pathname), [pathname])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-full items-center gap-2 rounded-lg border bg-secondary/50 p-2 text-start text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-medium">
            <selected.icon className="size-[18px] shrink-0" />
            {selected.label}
          </p>
        </div>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width)">
        {GUIDE_SECTIONS.map(section => {
          const isActive = section.value === selected.value
          return (
            <Link
              key={section.value}
              href={section.base}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent hover:text-accent-foreground"
            >
              <div className="grid min-w-0 flex-1 grid-cols-[18px_1fr] items-start gap-x-2">
                <section.icon className="row-span-2 size-[18px] shrink-0" />
                <p className="text-sm font-medium leading-none">{section.label}</p>
                <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">
                  {section.description}
                </p>
              </div>
              <Check className={cn('size-3.5 shrink-0 text-primary', !isActive && 'invisible')} />
            </Link>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
