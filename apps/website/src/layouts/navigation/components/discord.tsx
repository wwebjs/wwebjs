import Link from 'next/link'

import DiscordIcon from '@root/public/icons/discord.svg'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'

export function Discord() {
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      nativeButton={false}
      render={
        <Link href={siteConfig.links.discord} target="_blank" rel="noreferrer">
          <DiscordIcon className="size-4" />
          <span className="sr-only">Discord</span>
        </Link>
      }
    />
  )
}
