import { GuideTableOfContents } from './toc'
import { getMDXComponents } from '@/mdx-components'
import { PageHeader } from './header'
import { PageFooter } from './footer'
import { DocsBody } from 'fumadocs-ui/page'

import type { CrumbSegment } from '@/lib/page-tree'
import type { Neighbour } from './header'

type TocItem = { title?: React.ReactNode; url: string; depth: number }

type GuidePageContentProps = {
  title: string
  description?: string
  notice?: string
  lastModified?: Date
  badges?: string[]
  toc: TocItem[]
  breadcrumbs: CrumbSegment[]
  neighbours: { previous?: Neighbour; next?: Neighbour }
  markdownUrl: string
  page: string
  url: string
  githubUrl?: string
  MDX: React.ComponentType<{ components: ReturnType<typeof getMDXComponents> }>
}

export function GuidePageContent({
  title,
  description,
  notice,
  lastModified,
  badges,
  toc,
  breadcrumbs,
  neighbours,
  markdownUrl,
  page,
  url,
  githubUrl,
  MDX,
}: GuidePageContentProps) {
  return (
    <div
      data-slot="docs"
      className="flex scroll-mt-24 items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-[calc(40rem+10px)] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <PageHeader
            title={title}
            description={description}
            notice={notice}
            lastModified={lastModified}
            badges={badges}
            breadcrumbs={breadcrumbs}
            neighbours={neighbours}
            page={page}
            url={url}
            markdownUrl={markdownUrl}
            githubUrl={githubUrl}
          />

          {/* MDX content */}
          <DocsBody className="mt-6 w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
            <MDX components={getMDXComponents()} />
          </DocsBody>

          <div className="h-px w-full bg-border my-6" />

          <PageFooter neighbours={neighbours} url={url} />
        </div>
      </div>

      {/* TOC */}
      <div className="sticky top-[var(--header-height)] z-30 ml-auto hidden h-[calc(var(--content-height)-110px)] w-(--sidebar-width) flex-col overflow-hidden overscroll-none xl:flex">
        <GuideTableOfContents toc={toc ?? []} className="pt-10 pl-[22px] pr-8" />
      </div>
    </div>
  )
}
