'use client'

import * as React from 'react'
import { useDocsSearch } from 'fumadocs-core/search/client'
import { IconFileFilled } from '@tabler/icons-react'

import { searchClient, algoliaIndex } from '@/lib/algolia'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export function AlgoliaResults({ onSelect }: { onSelect: (url: string) => void }) {
  const { search, setSearch, query } = useDocsSearch(
    React.useMemo(
      () => ({
        type: 'algolia' as const,
        client: searchClient!,
        indexName: algoliaIndex,
      }),
      []
    )
  )

  const results = Array.isArray(query.data) ? query.data : []

  return (
    <>
      <CommandInput
        placeholder="Search documentation..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results found.</CommandEmpty>
        {results.length > 0 && (
          <CommandGroup heading="Documentation">
            {results.slice(0, 8).map(item => (
              <CommandItem key={item.id} value={item.id} onSelect={() => onSelect(item.url)}>
                <IconFileFilled className="size-4 opacity-60" />
                <span>{item.content}</span>
                {item.breadcrumbs && item.breadcrumbs.length > 0 && (
                  <span className="text-muted-foreground ml-auto truncate text-xs">
                    {item.breadcrumbs.join(' › ')}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </>
  )
}
