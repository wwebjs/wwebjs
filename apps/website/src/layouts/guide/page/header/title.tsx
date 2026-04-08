import { Badge } from '@/components/ui/badge'

export function PageTitle({
  title,
  badges,
  notice,
}: {
  title: string
  badges?: string[]
  notice?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">{title}</h1>
      {!notice && badges && badges.length > 0 && (
        <div className="flex gap-1.5 mt-1">
          {badges.map(badge => (
            <Badge key={badge}>@{badge.charAt(0).toUpperCase() + badge.slice(1)}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}
