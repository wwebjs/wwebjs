import { notFound } from 'next/navigation'
import { findNeighbour } from 'fumadocs-core/page-tree'
import { getGithubLastEdit } from 'fumadocs-core/content/github'
import type { Metadata } from 'next'

import { getPageImage, legacySource } from '@/lib/source'
import { getPageCrumbs } from '@/lib/page-tree'
import { GuidePageContent, getSectionCrumb } from '@/layouts/guide'

export function generateStaticParams() {
  return legacySource.generateParams()
}

export async function generateMetadata(
  props: PageProps<'/guide/legacy/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params
  const page = legacySource.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: getPageImage(page).url },
  }
}

export default async function Page(props: PageProps<'/guide/legacy/[[...slug]]'>) {
  const params = await props.params
  const page = legacySource.getPage(params.slug)
  if (!page) notFound()

  const data = page.data as typeof page.data & {
    body?: Parameters<typeof GuidePageContent>[0]['MDX']
    getText?: (type: string) => Promise<string>
    lastModified?: Date
    toc?: Parameters<typeof GuidePageContent>[0]['toc']
    badges?: string[]
  }

  const raw = (await data.getText?.('raw')) ?? ''
  const lastModified = await getGithubLastEdit({
    owner: 'wwebjs',
    repo: 'wwebjs',
    path: `apps/website/content/guide/legacy/${page.path}`,
    token: process.env.GITHUB_TOKEN,
  }).catch(() => data.lastModified)

  return (
    <GuidePageContent
      title={page.data.title ?? ''}
      description={page.data.description}
      toc={data.toc ?? []}
      breadcrumbs={getPageCrumbs(legacySource.pageTree, page.url, getSectionCrumb('legacy'))}
      neighbours={findNeighbour(legacySource.pageTree, page.url)}
      lastModified={lastModified ?? undefined}
      badges={data.badges}
      markdownUrl={`/llms.mdx${page.url}`}
      page={raw}
      url={`https://wwebjs.dev${page.url}`}
      MDX={data.body!}
    />
  )
}
