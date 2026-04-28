import Link from 'next/link'

import GitHubIcon from '@root/public/icons/github.svg'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'

async function fetchGitHubStars(): Promise<string | null> {
  try {
    const res = await fetch('https://api.github.com/repos/wwebjs/whatsapp-web.js', {
      // 1-hour cache: star count is decorative and a shorter TTL would hit the unauthenticated rate limit
      next: { revalidate: 3600 },
    })
    const json = (await res.json()) as { stargazers_count: number }
    const count = json.stargazers_count
    return count >= 1000 ? `${Math.round(count / 1000)}k` : String(count)
  } catch {
    return null
  }
}

export async function GitHub() {
  const stars = await fetchGitHubStars()

  return (
    <Button
      variant="ghost"
      size="lg"
      className="gap-1.5 shadow-none"
      nativeButton={false}
      render={
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <GitHubIcon className="size-4" />
          {stars !== null && (
            <span className="text-xs text-muted-foreground tabular-nums">{stars}</span>
          )}
        </Link>
      }
    />
  )
}
