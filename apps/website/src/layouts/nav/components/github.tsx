'use client'

import * as React from 'react'
import Link from 'next/link'

import GitHubIcon from '@root/public/icons/github.svg'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { siteConfig } from '@/lib/config'

export function GitHub() {
  const [stars, setStars] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch('https://api.github.com/repos/wwebjs/whatsapp-web.js')
      .then(r => r.json())
      .then((json: { stargazers_count: number }) => {
        const count = json.stargazers_count
        setStars(count >= 1000 ? `${Math.round(count / 1000)}k` : String(count))
      })
      .catch(() => null)
  }, [])

  return (
    <Button
      variant="ghost"
      size="lg"
      className="gap-1.5 shadow-none"
      nativeButton={false}
      render={
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <GitHubIcon className="size-4" />
          {stars === null ? (
            <Skeleton className="h-3.5 w-9" />
          ) : (
            <span className="text-xs text-muted-foreground tabular-nums">{stars}</span>
          )}
        </Link>
      }
    />
  )
}
