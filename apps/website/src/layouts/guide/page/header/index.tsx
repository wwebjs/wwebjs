import { Pencil } from 'lucide-react'
import { CopyPage } from './page-actions'
import { PageBreadcrumb } from './breadcrumb'
import { PageTitle } from './title'
import { PageNotice } from './notice'
import { PrevIconButton, NextIconButton } from '../next-page'
import type { CrumbSegment } from '@/lib/page-tree'

export type Neighbour = { url: string; name: React.ReactNode } | undefined

type PageHeaderProps = {
  title: string
  description?: string
  notice?: string
  lastModified?: Date
  badges?: string[]
  breadcrumbs: CrumbSegment[]
  neighbours: { previous?: Neighbour; next?: Neighbour }
  page: string
  url: string
  markdownUrl: string
  githubUrl?: string
}

function PageLastEdited({ lastModified, githubUrl }: { lastModified?: Date; githubUrl?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <p className="text-sm text-muted-foreground">
        {lastModified
          ? `Last edited ${lastModified.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
          : 'Last edited, not long ago'}
      </p>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Edit on GitHub"
        >
          <Pencil className="size-3.5" />
        </a>
      )}
    </div>
  )
}

function PageActions({
  page,
  url,
  markdownUrl,
  previous,
  next,
}: {
  page: string
  url: string
  markdownUrl: string
  previous?: Neighbour
  next?: Neighbour
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <div className="hidden sm:block">
        <CopyPage page={page} url={url} markdownUrl={markdownUrl} />
      </div>
      <div className="flex gap-1.5">
        {previous && <PrevIconButton url={previous.url} />}
        {next && <NextIconButton url={next.url} />}
      </div>
    </div>
  )
}

export function PageHeader({
  title,
  description,
  notice,
  lastModified,
  badges,
  breadcrumbs,
  neighbours,
  page,
  url,
  markdownUrl,
  githubUrl,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-10 pb-1">
      <div className="flex flex-col gap-1">
        <PageBreadcrumb crumbs={breadcrumbs} />
        <PageLastEdited lastModified={lastModified} githubUrl={githubUrl} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <PageTitle title={title} badges={badges} notice={notice} />
          <PageActions
            page={page}
            url={url}
            markdownUrl={markdownUrl}
            previous={neighbours.previous}
            next={neighbours.next}
          />
        </div>
        {description && <p className="text-base text-muted-foreground">{description}</p>}
      </div>
      {notice && <PageNotice notice={notice} badges={badges} />}
    </div>
  )
}
