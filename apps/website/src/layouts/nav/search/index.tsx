'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { searchClient } from '@/lib/algolia'
import { Button } from '@/components/ui/button'
import { Command, CommandDialog } from '@/components/ui/command'
import { AlgoliaResults } from './algolia-results'
import { StaticNav } from './static-nav'

export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = React.useCallback(
    (url: string) => {
      setOpen(false)
      router.push(url)
    },
    [router]
  )

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-2 px-2 text-muted-foreground shadow-none"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span className="hidden text-sm sm:inline-flex">Search...</span>
        <kbd className="bg-muted hidden items-center gap-0.5 rounded border px-1.5 py-0.5 font-mono text-[10px] sm:flex">
          <span>⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-xl top-[20%]">
        <Command defaultValue="">
          {searchClient ? (
            <AlgoliaResults onSelect={navigate} />
          ) : (
            <StaticNav onSelect={navigate} />
          )}
        </Command>
      </CommandDialog>
    </>
  )
}
