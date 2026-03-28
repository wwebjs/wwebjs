'use client'

import { BookOpenIcon, FileIcon } from 'lucide-react'

import { siteConfig } from '@/lib/config'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function StaticNav({ onSelect }: { onSelect: (url: string) => void }) {
  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {siteConfig.navItems.map(item => (
            <CommandItem
              key={item.href}
              value={`nav ${item.label}`}
              onSelect={() => onSelect(item.href)}
            >
              <FileIcon className="size-4 opacity-60" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Documentation">
          <CommandItem value="guide introduction" onSelect={() => onSelect('/guide')}>
            <BookOpenIcon className="size-4 opacity-60" />
            Getting Started
          </CommandItem>
          <CommandItem
            value="guide authentication"
            onSelect={() => onSelect('/guide/legacy/creating-your-bot/authentication')}
          >
            <BookOpenIcon className="size-4 opacity-60" />
            Authentication
          </CommandItem>
          <CommandItem
            value="guide messages"
            onSelect={() => onSelect('/guide/legacy/creating-your-bot/handling-attachments')}
          >
            <BookOpenIcon className="size-4 opacity-60" />
            Handling Attachments
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}
