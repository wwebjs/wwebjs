import type { ReactNode } from 'react'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PrevIconButton({ url }: { url: string }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="extend-touch-target size-7.5 rounded-md"
      nativeButton={false}
      render={<Link href={url} />}
    >
      <IconArrowLeft />
      <span className="sr-only">Previous</span>
    </Button>
  )
}

export function NextIconButton({ url }: { url: string }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="extend-touch-target size-7.5 rounded-md"
      nativeButton={false}
      render={<Link href={url} />}
    >
      <span className="sr-only">Next</span>
      <IconArrowRight />
    </Button>
  )
}

export function PrevPageButton({ url, name }: { url: string; name: ReactNode }) {
  return (
    <Button variant="secondary" size="lg" nativeButton={false} render={<Link href={url} />}>
      <IconArrowLeft /> {name}
    </Button>
  )
}

export function NextPageButton({
  url,
  name,
  hasPrev,
}: {
  url: string
  name: ReactNode
  hasPrev?: boolean
}) {
  return (
    <Button
      variant="secondary"
      size="lg"
      className={cn('shadow-none', !hasPrev && 'ml-auto')}
      nativeButton={false}
      render={<Link href={url} />}
    >
      {name} <IconArrowRight />
    </Button>
  )
}
