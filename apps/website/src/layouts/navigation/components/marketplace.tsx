import Link from 'next/link'

import { IconTagFilled } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'

export function Marketplace() {
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      nativeButton={false}
      render={
        <Link href={siteConfig.links.marketplace}>
          <IconTagFilled className="size-4" />
        </Link>
      }
    />
  )
}
